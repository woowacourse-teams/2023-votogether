package com.votogether.domain.alarm.dto;

import com.votogether.domain.alarm.entity.ReportActionAlarm;

public record ReportActionAlarmResponse(
        Long alarmId,
        boolean isChecked,
        ReportActionResponse detail

) {

    public static ReportActionAlarmResponse from(
            final ReportActionAlarm reportActionAlarm
    ) {
        return new ReportActionAlarmResponse(
                reportActionAlarm.getId(),
                reportActionAlarm.isChecked(),
                ReportActionResponse.from(reportActionAlarm)
        );
    }

}


