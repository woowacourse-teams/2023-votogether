package com.votogether.domain.alarm.dto;

import com.votogether.domain.alarm.entity.ReportActionAlarm;
import java.time.LocalDateTime;

public record ReportActionAlarmResponse(
        Long id,
        ReportActionResponse reportActionResponse,
        LocalDateTime createdAt,
        boolean isChecked

) {

    public static ReportActionAlarmResponse from(final ReportActionAlarm reportActionAlarm) {
        return new ReportActionAlarmResponse(
                reportActionAlarm.getId(),
                ReportActionResponse.from(reportActionAlarm),
                reportActionAlarm.getCreatedAt(),
                reportActionAlarm.isChecked()
        );
    }

}


