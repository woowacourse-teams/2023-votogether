package com.votogether.domain.notice.entity;

import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.notice.entity.vo.BannerTitle;
import com.votogether.domain.notice.entity.vo.Detail;
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
import jakarta.persistence.Table;
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
@Table(indexes = {@Index(name = "idx_created", columnList = "createdAt")})
public class Notice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Embedded
    private Detail detail;

    @Embedded
    private BannerTitle bannerTitle;

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
        this.detail = new Detail(title, content);
        this.bannerTitle = new BannerTitle(bannerTitle, bannerSubtitle);
        this.deadline = deadline;
    }

    public void update(
            final Detail detail,
            final BannerTitle bannerTitle,
            final LocalDateTime deadline
    ) {
        this.detail = detail;
        this.bannerTitle = bannerTitle;
        this.deadline = deadline;
    }

    public String getTitle() {
        return this.detail.getTitle();
    }

    public String getContent() {
        return this.detail.getContent();
    }

    public String getBannerTitle() {
        return this.bannerTitle.getBannerTitle();
    }

    public String getBannerSubtitle() {
        return this.bannerTitle.getBannerSubtitle();
    }
}
