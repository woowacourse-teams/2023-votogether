package com.votogether.domain.alarm.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.votogether.domain.alarm.entity.Alarm;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

@Schema(description = "게시글 내역 조회 응답")
public record PostAlarmResponse(
        @Schema(description = "알림 ID", example = "1")
        Long alarmId,

        @Schema(description = "알림 세부 사항")
        PostAlarmDetailResponse detail,

        @Schema(description = "게시글 생성 시각", example = "2023-10-16 21:25")
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime createdAt,

        @Schema(description = "알림 확인 여부", example = "false")
        boolean isChecked
) {

    public static PostAlarmResponse of(final Alarm alarm) {
        return new PostAlarmResponse(
                alarm.getId(),
                PostAlarmDetailResponse.of(alarm),
                alarm.getCreatedAt(),
                alarm.isChecked()
        );
    }

}
