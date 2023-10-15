package com.votogether.domain.alarm.dto.response;

import java.time.LocalDateTime;

public record PostAlarmResponse(
        Long id,
        PostAlarmDetailResponse postAlarmDetailResponse,
        LocalDateTime createdAt,
        boolean isChecked
) {
}
