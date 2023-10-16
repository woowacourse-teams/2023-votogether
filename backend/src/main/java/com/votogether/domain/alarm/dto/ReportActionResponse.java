package com.votogether.domain.alarm.dto;

import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.report.entity.vo.ReportType;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public record ReportActionResponse(
        Long reportActionId,
        ReportType type,
        String target,
        Set<String> reasons,
        LocalDateTime createdAt
) {

    public static ReportActionResponse from(final ReportActionAlarm reportActionAlarm) {
        final Set<String> reasons = Stream.of(reportActionAlarm.getReasons().split(","))
                .map(String::strip)
                .collect(Collectors.toSet());

        return new ReportActionResponse(
                reportActionAlarm.getId(),
                reportActionAlarm.getReportType(),
                reportActionAlarm.getTarget(),
                reasons,
                reportActionAlarm.getCreatedAt()
        );
    }
}


