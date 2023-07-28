package com.votogether.domain.post.entity;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.vote.entity.Vote;
import com.votogether.exception.BadRequestException;
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
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.IntStream;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Embedded
    private PostBody postBody;

    @Embedded
    private PostCategories postCategories;

    @Embedded
    private PostOptions postOptions;

    @Column(columnDefinition = "datetime(2)", nullable = false)
    private LocalDateTime deadline;

    @OneToMany(mappedBy = "post", cascade = CascadeType.PERSIST)
    private List<Comment> comments = new ArrayList<>();

    @Builder
    private Post(
            final Member member,
            final PostBody postBody,
            final LocalDateTime deadline
    ) {
        this.member = member;
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
            final Post post,
            final List<MultipartFile> images
    ) {
        this.postOptions.addAllPostOptions(toPostOptionEntities(postOptionContents, post, images));
    }

    private List<PostOption> toPostOptionEntities(
            final List<String> postOptionContents,
            final Post post,
            final List<MultipartFile> images
    ) {
        return IntStream.range(0, postOptionContents.size())
                .mapToObj(postOptionSequence ->
                        PostOption.of(
                                postOptionContents.get(postOptionSequence),
                                post,
                                postOptionSequence,
                                images.get(postOptionSequence)
                        )
                )
                .toList();
    }

    public boolean hasPostOption(final PostOption postOption) {
        return postOptions.contains(postOption);
    }

    public void validateWriter(final Member member) {
        if (!Objects.equals(this.member, member)) {
            throw new BadRequestException(PostExceptionType.NOT_WRITER);
        }
    }

    public boolean isClosed() {
        return deadline.isBefore(LocalDateTime.now());
    }

    public Vote makeVote(Member member, PostOption postOption) {
        validateDeadLine();
        validateWriter(member);
        validatePostOption(postOption);

        return Vote.builder()
                .member(member)
                .postOption(postOption)
                .build();
    }

    public void validateDeadLine() {
        if (isClosed()) {
            throw new BadRequestException(PostExceptionType.POST_CLOSED);
        }
    }

    private void validatePostOption(PostOption postOption) {
        if (!hasPostOption(postOption)) {
            throw new BadRequestException(PostExceptionType.POST_OPTION_NOT_FOUND);
        }
    }

    public void validateHalfDeadLine() {
        final Duration betweenDuration = Duration.between(getCreatedAt(), this.deadline);
        final LocalDateTime midpoint = getCreatedAt().plus(betweenDuration.dividedBy(2));

        if (midpoint.isAfter(LocalDateTime.now())) {
            throw new BadRequestException(PostExceptionType.POST_NOT_HALF_DEADLINE);
        }
    }

    public void closedEarly() {
        this.deadline = LocalDateTime.now();
    }

    public void addComment(final Comment comment) {
        comments.add(comment);
        comment.setPost(this);
    }

}
