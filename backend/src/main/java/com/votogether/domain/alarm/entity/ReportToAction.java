package com.votogether.domain.alarm.entity;

import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.report.entity.Report;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@EqualsAndHashCode(of = {"id"}, callSuper = false)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReportToAction extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "report_id", nullable = false)
    private Report report;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "report_action_alarm_id", nullable = false)
    private ReportActionAlarm reportActionAlarm;

    @Builder
    public ReportToAction(
            final Report report,
            final ReportActionAlarm reportActionAlarm
    ) {
        this.report = report;
        this.reportActionAlarm = reportActionAlarm;
    }

}
