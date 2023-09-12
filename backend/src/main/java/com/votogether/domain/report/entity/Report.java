package com.votogether.domain.report.entity;

import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.entity.vo.ReportType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(
        uniqueConstraints = {@UniqueConstraint(columnNames = {"member_id", "reportType", "targetId"})},
        indexes = {@Index(columnList = "targetId, reportType")}
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Report extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private ReportType reportType;

    @Column(nullable = false)
    private Long targetId;

    @Column(nullable = false, length = 50)
    private String reason;

    @Builder
    private Report(
            final Member member,
            final ReportType reportType,
            final Long targetId,
            final String reason
    ) {
        this.member = member;
        this.reportType = reportType;
        this.targetId = targetId;
        this.reason = reason;
    }

}
