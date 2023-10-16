package com.votogether.domain.alarm.dto;

import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.report.entity.vo.ReportType;
import java.time.LocalDateTime;
import java.util.Set;

public record ReportActionResponse(
        Long reportActionId,
        ReportType type,
        String target,
        Set<String> reasons,
        LocalDateTime createdAt
) {

    public static ReportActionResponse of(final ReportActionAlarm reportActionAlarm, final Set<String> reasons) {
        return new ReportActionResponse(
                reportActionAlarm.getId(),
                reportActionAlarm.getReportType(),
                reportActionAlarm.getTarget(),
                reasons,
                reportActionAlarm.getCreatedAt()
        );
    }

}


