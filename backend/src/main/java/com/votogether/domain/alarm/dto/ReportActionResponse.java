package com.votogether.domain.alarm.dto;

import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.report.entity.vo.ReportType;
import java.time.LocalDateTime;
import java.util.List;

public record ReportActionResponse(
        Long id,
        ReportType type,
        String target,
        List<String> reasons,
        LocalDateTime createdAt
) {

    public static ReportActionResponse of(final ReportActionAlarm reportActionAlarm, final List<String> reasons) {
        return new ReportActionResponse(
                reportActionAlarm.getId(),
                reportActionAlarm.getReportType(),
                reportActionAlarm.getTarget(),
                reasons,
                reportActionAlarm.getCreatedAt()
        );
    }

}
