package com.votogether.domain.alarm.entity;

import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.report.entity.Report;
import jakarta.persistence.*;
import lombok.*;

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
