package com.votogether.domain.alarm.dto;

import com.votogether.domain.alarm.entity.ReportActionAlarm;
import java.util.Collections;

public record ReportActionAlarmResponse(
        Long id,
        boolean isChecked,
        ReportActionResponse reportActionResponse

) {

    public static ReportActionAlarmResponse from(
            final ReportActionAlarm reportActionAlarm
    ) {
        return new ReportActionAlarmResponse(
                reportActionAlarm.getId(),
                reportActionAlarm.isChecked(),
                ReportActionResponse.of(reportActionAlarm, Collections.EMPTY_SET)
        );
    }

}


