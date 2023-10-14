package com.votogether.domain.post.entity;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.exception.PostOptionExceptionType;
import com.votogether.domain.vote.entity.Vote;
import com.votogether.domain.vote.exception.VoteExceptionType;
import com.votogether.global.exception.BadRequestException;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@EqualsAndHashCode(of = {"id"}, callSuper = false)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(indexes = {@Index(name = "idx_vote_count", columnList = "voteCount")})
public class Post extends BaseEntity {

    private static final int MAXIMUM_POST_OPTION_SIZE = 5;
    private static final long DELETE_VOTE_LIMIT = 20;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member writer;

    @Embedded
    private PostBody postBody;

    @Column(nullable = false)
    private long voteCount;

    @Embedded
    private PostDeadline postDeadline;

    @Column(nullable = false)
    private boolean isHidden;

    @OneToMany(mappedBy = "post", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<PostCategory> postCategories = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<PostContentImage> postContentImages = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<PostOption> postOptions = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @Builder
    private Post(
            final Member writer,
            final String title,
            final String content,
            final long voteCount,
            final LocalDateTime deadline
    ) {
        this.writer = writer;
        this.postBody = new PostBody(title, content);
        this.voteCount = voteCount;
        this.postDeadline = new PostDeadline(deadline);
        this.isHidden = false;
    }

    public void addCategory(final Category category) {
        final PostCategory postCategory = PostCategory.builder()
                .post(this)
                .category(category)
                .build();
        this.postCategories.add(postCategory);
    }

    public void addContentImage(final String path) {
        final PostContentImage postContentImage = PostContentImage.builder()
                .post(this)
                .imageUrl(path)
                .build();
        this.postContentImages.add(postContentImage);
    }

    public void addPostOption(final PostOption postOption) {
        postOption.setPost(this);
        this.postOptions.add(postOption);
    }

    public void addComment(final Comment comment) {
        comment.setPost(this);
        this.comments.add(comment);
    }

    public void removePostContentImage(final PostContentImage postContentImage) {
        this.postContentImages.remove(postContentImage);
    }

    public void removePostOption(final PostOption deletedOption) {
        this.postOptions.remove(deletedOption);
    }

    public void update(final String title, final String content, final LocalDateTime deadline) {
        this.postBody = new PostBody(title, content);
        this.postDeadline = new PostDeadline(deadline);
    }

    public void increaseVoteCount() {
        this.voteCount += 1;
    }

    public void decreaseVoteCount() {
        this.voteCount -= 1;
    }

    public void closeEarly() {
        this.postDeadline.close();
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
            throw new BadRequestException(PostExceptionType.CLOSED);
        }
    }

    private void validateVoter(final Member voter) {
        if (Objects.equals(this.writer.getId(), voter.getId())) {
            throw new BadRequestException(VoteExceptionType.CANNOT_VOTE_MY_POST);
        }
    }

    private void validatePostOption(final PostOption postOption) {
        if (!hasPostOption(postOption)) {
            throw new BadRequestException(PostOptionExceptionType.NOT_FOUND);
        }
    }

    private boolean hasPostOption(final PostOption postOption) {
        return this.postOptions.contains(postOption);
    }

    public boolean canDelete() {
        final long totalVoteCount = this.postOptions.stream()
                .mapToLong(PostOption::getVoteCount)
                .sum();
        return totalVoteCount < DELETE_VOTE_LIMIT;
    }

    public boolean isWriter(final Member member) {
        return Objects.equals(this.writer, member);
    }

    public boolean isClosed() {
        return this.postDeadline.isClosed();
    }

    public void blind() {
        this.isHidden = true;
    }

    public boolean isLimitOptionSize(final int size) {
        return size <= MAXIMUM_POST_OPTION_SIZE;
    }

    public String getTitle() {
        return this.postBody.getTitle();
    }

    public String getContent() {
        return this.postBody.getContent();
    }

    public LocalDateTime getDeadline() {
        return this.postDeadline.getDeadline();
    }

    public PostContentImage getFirstContentImage() {
        if (this.postContentImages.isEmpty()) {
            return null;
        }
        return postContentImages.get(0);
    }

}
