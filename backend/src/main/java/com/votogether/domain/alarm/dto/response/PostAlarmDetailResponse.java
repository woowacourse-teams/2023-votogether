package com.votogether.domain.alarm.dto.response;

public record PostAlarmDetailResponse(
        Long id,
        String title,
        String nickname
) {
}
