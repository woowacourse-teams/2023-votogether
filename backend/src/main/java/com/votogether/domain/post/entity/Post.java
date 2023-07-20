package com.votogether.domain.post.entity;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.vote.entity.Vote;
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

    public boolean isWriter(final Member member) {
        return this.member == member;
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
            throw new IllegalStateException("게시글이 이미 마감되었습니다.");
        }
    }

    private void validateWriter(Member member) {
        if (isWriter(member)) {
            throw new IllegalArgumentException("작성자는 투표할 수 없습니다.");
        }
    }

    private void validatePostOption(PostOption postOption) {
        if (!hasPostOption(postOption)) {
            throw new IllegalArgumentException("해당 게시글에서 존재하지 않는 선택지 입니다.");
        }
    }

    public void validateUnfinished() {
        if (!isClosed()) {
            throw new IllegalArgumentException("마감 안된 게시글은 삭제할 수 없습니다.");
        }
    }
}
