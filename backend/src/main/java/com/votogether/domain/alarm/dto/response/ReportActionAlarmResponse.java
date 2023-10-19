package com.votogether.domain.alarm.dto.response;

import com.votogether.domain.alarm.entity.ReportActionAlarm;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "신고조치알림 응답")
public record ReportActionAlarmResponse(
        @Schema(description = "알림 ID", example = "1")
        Long alarmId,

        @Schema(description = "확인 여부", example = "false")
        boolean isChecked,

        @Schema(description = "신고조치 세부정보")
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
