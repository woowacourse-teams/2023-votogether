package com.votogether.domain.alarm.dto.response;

import com.votogether.domain.alarm.entity.Alarm;
import java.time.LocalDateTime;

public record PostAlarmResponse(
        Long id,
        PostAlarmDetailResponse postAlarmDetailResponse,
        LocalDateTime createdAt,
        boolean isChecked
) {

    public static PostAlarmResponse of(final Alarm alarm, final String nickname) {
        return new PostAlarmResponse(
                alarm.getId(),
                PostAlarmDetailResponse.of(alarm, nickname),
                alarm.getCreatedAt(),
                alarm.isChecked()
        );
    }

}
