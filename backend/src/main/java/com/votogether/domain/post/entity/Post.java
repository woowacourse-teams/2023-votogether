package com.votogether.domain.post.entity;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.report.exception.ReportExceptionType;
import com.votogether.domain.vote.entity.Vote;
import com.votogether.exception.BadRequestException;
import jakarta.persistence.Basic;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.IntStream;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Post extends BaseEntity {

    private static final Integer FIRST_OPTION_SEQUENCE = 1;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member writer;

    @Embedded
    private PostBody postBody;

    @Embedded
    private PostCategories postCategories;

    @Embedded
    private PostOptions postOptions;

    @Column(columnDefinition = "datetime(6)", nullable = false)
    private LocalDateTime deadline;

    @Column(nullable = false)
    private boolean isHidden;

    @Basic(fetch = FetchType.LAZY)
    @Formula("(select count(v.id) from Vote v where v.post_option_id in "
            + "(select po.id from Post_Option po where po.post_id = id)"
            + ")")
    private long totalVoteCount;

    @OneToMany(mappedBy = "post", cascade = CascadeType.PERSIST)
    private List<Comment> comments = new ArrayList<>();

    @Builder
    private Post(
            final Member writer,
            final PostBody postBody,
            final LocalDateTime deadline,
            final boolean isHidden
    ) {
        this.writer = writer;
        this.postBody = postBody;
        this.deadline = deadline;
        this.postCategories = new PostCategories();
        this.postOptions = new PostOptions();
        this.isHidden = isHidden;
    }

    public void mapCategories(final List<Category> categories) {
        this.postCategories.mapPostAndCategories(this, categories);
    }

    public void mapPostOptionsByElements(
            final List<String> postOptionContents,
            final List<String> optionImageUrls
    ) {
        this.postOptions.addAllPostOptions(toPostOptions(postOptionContents, optionImageUrls));
    }

    private List<PostOption> toPostOptions(
            final List<String> postOptionContents,
            final List<String> optionImageUrls
    ) {
        return IntStream.rangeClosed(FIRST_OPTION_SEQUENCE, postOptionContents.size())
                .mapToObj(postOptionSequence ->
                        PostOption.of(
                                postOptionContents.get(postOptionSequence - 1),
                                this,
                                postOptionSequence,
                                optionImageUrls.get(postOptionSequence - 1)
                        )
                )
                .toList();
    }

    public void validateDeadlineNotExceedByMaximumDeadline(final int maximumDeadline) {
        LocalDateTime maximumDeadlineFromNow = LocalDateTime.now().plusDays(maximumDeadline);
        if (this.deadline.isAfter(maximumDeadlineFromNow)) {
            throw new BadRequestException(PostExceptionType.DEADLINE_EXCEED_THREE_DAYS);
        }
    }

    public void validateWriter(final Member member) {
        if (!Objects.equals(this.writer, member)) {
            throw new BadRequestException(PostExceptionType.NOT_WRITER);
        }
    }

    public Vote makeVote(final Member voter, final PostOption postOption) {
        validateDeadLine();
        validateVoter(voter);
        validatePostOption(postOption);

        final Vote vote = Vote.builder()
                .member(voter)
                .build();

        postOption.addVote(vote);
        return vote;
    }

    public void validateDeadLine() {
        if (isClosed()) {
            throw new BadRequestException(PostExceptionType.POST_CLOSED);
        }
    }

    public boolean isClosed() {
        return deadline.isBefore(LocalDateTime.now());
    }

    private void validateVoter(final Member voter) {
        if (Objects.equals(this.writer.getId(), voter.getId())) {
            throw new BadRequestException(PostExceptionType.NOT_VOTER);
        }
    }

    private void validatePostOption(final PostOption postOption) {
        if (!hasPostOption(postOption)) {
            throw new BadRequestException(PostExceptionType.POST_OPTION_NOT_FOUND);
        }
    }

    private boolean hasPostOption(final PostOption postOption) {
        return postOptions.contains(postOption);
    }

    public void closeEarly() {
        this.deadline = LocalDateTime.now();
    }

    public void addContentImage(final String contentImageUrl) {
        this.postBody.addContentImage(this, contentImageUrl);
    }

    public long getFinalTotalVoteCount(final Member loginMember) {
        if (isVisibleVoteResult(loginMember)) {
            return this.totalVoteCount;
        }

        return -1L;
    }

    public boolean isVisibleVoteResult(final Member member) {
        return this.postOptions.getSelectedOptionId(member) != 0 || this.writer.equals(member);
    }

    public void blind() {
        this.isHidden = true;
    }

    public void validateMine(final Member member) {
        if (this.writer.equals(member)) {
            throw new BadRequestException(ReportExceptionType.REPORT_MY_POST);
        }
    }

    public void validateHidden() {
        if (this.isHidden) {
            throw new BadRequestException(ReportExceptionType.ALREADY_HIDDEN_POST);
        }
    }

    public void addComment(final Comment comment) {
        comments.add(comment);
        comment.setPost(this);
    }

    public void update(
            final PostBody postBody,
            final String oldContentImageUrl,
            final List<String> contentImageUrls,
            final List<Category> categories,
            final List<String> postOptionContents,
            final List<String> oldPostOptionImageUrls,
            final List<String> postOptionImageUrls,
            final LocalDateTime deadline
    ) {
        updatePostBody(postBody, oldContentImageUrl, contentImageUrls);
        updatePostCategories(categories);
        updatePostOptions(postOptionContents, oldPostOptionImageUrls, postOptionImageUrls);
        this.deadline = deadline;
    }

    private void updatePostBody(
            final PostBody postBody,
            final String oldContentImageUrl,
            final List<String> contentImageUrls
    ) {
        this.postBody = postBody;
        this.postBody.addContentImage(this, getContentImageUrl(oldContentImageUrl, contentImageUrls));
    }

    private String getContentImageUrl(
            final String oldContentImageUrl,
            final List<String> contentImageUrls
    ) {
        if (contentImageUrls.isEmpty()) {
            return oldContentImageUrl;
        }

        return contentImageUrls.get(0);
    }

    private void updatePostCategories(final List<Category> categories) {
        this.postCategories = new PostCategories();
        this.postCategories.mapPostAndCategories(this, categories);
    }

    private void updatePostOptions(
            final List<String> postOptionContents,
            final List<String> oldPostOptionImageUrls,
            final List<String> postOptionImageUrls
    ) {
        this.postOptions = new PostOptions();
        mapPostOptionsByElements(postOptionContents, getPostOptionImageUrls(oldPostOptionImageUrls, postOptionImageUrls));
    }

    private List<String> getPostOptionImageUrls(
            final List<String> oldPostOptionImageUrls,
            final List<String> postOptionImageUrls
    ) {
        return IntStream.range(0, postOptionImageUrls.size())
                .mapToObj(postOptionIndex ->
                        getPostOptionImageUrl(
                                postOptionIndex,
                                oldPostOptionImageUrls,
                                postOptionImageUrls
                        )
                )
                .toList();
    }

    private String getPostOptionImageUrl(
            final int postOptionIndex,
            final List<String> oldPostOptionImageUrls,
            final List<String> postOptionImageUrls
    ) {
        final String postOptionImageUrl = postOptionImageUrls.get(postOptionIndex);
        if (postOptionImageUrl.isEmpty()) {
            return oldPostOptionImageUrls.get(postOptionIndex);
        }

        return postOptionImageUrls.get(postOptionIndex);
    }

}
