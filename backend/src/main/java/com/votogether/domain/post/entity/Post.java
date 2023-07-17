package com.votogether.domain.post.entity;

import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.vote.entity.Vote;
import jakarta.persistence.Column;
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
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 1000, nullable = false)
    private String content;

    @Column(columnDefinition = "datetime(2)", nullable = false)
    private LocalDateTime deadline;

    @OneToMany(mappedBy = "post")
    private List<PostOption> postOptions = new ArrayList<>();

    @Builder
    private Post(
            final Member member,
            final String title,
            final String content,
            final LocalDateTime deadline,
            final List<PostOption> postOptions
    ) {
        this.member = member;
        this.title = title;
        this.content = content;
        this.deadline = deadline;
        this.postOptions = new ArrayList<>(postOptions);
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

    private void validateDeadLine() {
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

}
