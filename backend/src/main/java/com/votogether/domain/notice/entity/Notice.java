package com.votogether.domain.notice.entity;

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
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@EqualsAndHashCode(of = {"id"}, callSuper = false)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(length = 100)
    private String bannerTitle;

    @Column(length = 100)
    private String bannerSubtitle;

    @Column(nullable = false, length = 3000)
    private String content;

    @Column(columnDefinition = "datetime(6)", nullable = false)
    private LocalDateTime deadline;

    @Builder
    private Notice(
            final Member member,
            final String title,
            final String bannerTitle,
            final String bannerSubtitle,
            final String content,
            final LocalDateTime deadline
    ) {
        this.member = member;
        this.title = title;
        this.bannerTitle = bannerTitle;
        this.bannerSubtitle = bannerSubtitle;
        this.content = content;
        this.deadline = deadline;
    }

}
