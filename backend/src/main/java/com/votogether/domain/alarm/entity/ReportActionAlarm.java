package com.votogether.domain.alarm.entity;

import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.entity.vo.ReportType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = {"id"}, callSuper = false)
public class ReportActionAlarm extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private ReportType reportType;

    @Column(length = 500, nullable = false)
    private String target;

    @Column(nullable = false)
    private boolean isChecked;

    @Builder
    public ReportActionAlarm(
            final Member member,
            final ReportType reportType,
            final String target,
            final boolean isChecked
    ) {
        this.member = member;
        this.reportType = reportType;
        this.target = target;
        this.isChecked = isChecked;
    }
}
