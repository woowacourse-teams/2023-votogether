package com.votogether.domain.alarm.dto;

import com.votogether.domain.alarm.entity.ReportActionAlarm;

import java.time.LocalDateTime;

public record ReportActionAlarmResponse(
        Long id,
        ReportActionResponse reportActionResponse,
        LocalDateTime createdAt,
        boolean isChecked

) {

    public static ReportActionAlarmResponse of(final ReportActionAlarm reportActionAlarm) {
        return new ReportActionAlarmResponse(
                reportActionAlarm.getId(),
                ReportActionResponse.of(reportActionAlarm),
                reportActionAlarm.getCreatedAt(),
                reportActionAlarm.isChecked()
        );
    }

}


