package com.votogether.domain.post.entity;

import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.member.entity.Member;
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
            final LocalDateTime deadline
    ) {
        this.member = member;
        this.title = title;
        this.content = content;
        this.deadline = deadline;
    }

    public PostOption findPostOptionById(final Long PostOptionId) {
        return postOptions.stream()
                .filter(postOption -> postOption.getId().equals(PostOptionId))
                .findAny()
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글에서 존재하지 않는 선택지 입니다."));
    }

    public boolean isWriter(Member member) {
        return this.member == member;
    }

}
