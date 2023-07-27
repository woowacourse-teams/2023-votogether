package com.votogether.domain.post.entity;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.vote.entity.Vote;
import com.votogether.exception.BadRequestException;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.IntStream;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;
import org.springframework.web.multipart.MultipartFile;

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

    @Column(columnDefinition = "datetime(2)", nullable = false)
    private LocalDateTime deadline;

    @Basic(fetch = FetchType.LAZY)
    @Formula("(select count(v.id) from Vote v where v.post_option_id in "
            + "(select po.id from Post_Option po where po.post_id = id)"
            + ")")
    private Long totalVoteCount;

    @Builder
    private Post(
            final Member writer,
            final PostBody postBody,
            final LocalDateTime deadline
    ) {
        this.writer = writer;
        this.postBody = postBody;
        this.deadline = deadline;
        this.postCategories = new PostCategories();
        this.postOptions = new PostOptions();
    }

    public void mapCategories(final List<Category> categories) {
        this.postCategories.mapPostAndCategories(this, categories);
    }

    public void mapPostOptionsByElements(
            final List<String> postOptionContents,
            final List<MultipartFile> images
    ) {
        this.postOptions.addAllPostOptions(toPostOptionEntities(postOptionContents, images));
    }

    private List<PostOption> toPostOptionEntities(
            final List<String> postOptionContents,
            final List<MultipartFile> images
    ) {
        return toPostOptions(postOptionContents, images);
    }

    private List<PostOption> toPostOptions(final List<String> postOptionContents, final List<MultipartFile> images) {
        return IntStream.rangeClosed(FIRST_OPTION_SEQUENCE, postOptionContents.size())
                .mapToObj(postOptionSequence ->
                        PostOption.of(
                                postOptionContents.get(postOptionSequence - 1),
                                this,
                                postOptionSequence,
                                images.get(postOptionSequence - 1)
                        )
                )
                .toList();
    }

    public boolean hasPostOption(final PostOption postOption) {
        return postOptions.contains(postOption);
    }

    public void validateWriter(final Member member) {
        if (!Objects.equals(this.writer.getId(), member.getId())) {
            throw new BadRequestException(PostExceptionType.NOT_WRITER);
        }
    }

    public boolean isClosed() {
        return deadline.isBefore(LocalDateTime.now());
    }

    public Vote makeVote(Member voter, PostOption postOption) {
        validateDeadLine();
        validateVoter(voter);
        validatePostOption(postOption);

        final Vote vote = Vote.builder()
                .member(voter)
                .postOption(postOption)
                .build();

        postOption.addVote(vote);
        return vote;
    }

    private void validateVoter(final Member voter) {
        if (Objects.equals(this.writer.getId(), voter.getId())) {
            throw new BadRequestException(PostExceptionType.NOT_VOTER);
        }
    }

    private void validateDeadLine() {
        if (isClosed()) {
            throw new IllegalStateException("게시글이 이미 마감되었습니다.");
        }
    }

    private void validatePostOption(PostOption postOption) {
        if (!hasPostOption(postOption)) {
            throw new IllegalArgumentException("해당 게시글에서 존재하지 않는 선택지 입니다.");
        }
    }

    public boolean isWriter(final Member member) {
        return Objects.equals(this.writer, member);
    }

    public Long getFinalTotalVoteCount(final Member loginMember) {
        if (isCanSeeVoteResult(loginMember)) {
            return this.totalVoteCount;
        }

        return -1L;
    }

    public boolean isCanSeeVoteResult(final Member member) {
        return this.postOptions.getSelectOption(member) != 0 || this.writer.equals(member);
    }

}
