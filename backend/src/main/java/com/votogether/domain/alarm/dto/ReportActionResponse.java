package com.votogether.domain.alarm.dto;

import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.report.entity.vo.ReportType;

public record ReportActionResponse(
        Long id,
        ReportType type,
        String target
) {

    public static ReportActionResponse of(final ReportActionAlarm reportActionAlarm) {
        return new ReportActionResponse(
                reportActionAlarm.getId(),
                reportActionAlarm.getReportType(),
                reportActionAlarm.getTarget()
        );
    }
}
