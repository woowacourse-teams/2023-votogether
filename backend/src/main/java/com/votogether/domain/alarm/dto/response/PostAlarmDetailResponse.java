package com.votogether.domain.alarm.dto.response;

import com.votogether.domain.alarm.entity.Alarm;

public record PostAlarmDetailResponse(
        Long id,
        String title,
        String nickname
) {

    public static PostAlarmDetailResponse of(final Alarm alarm, final String nickname) {
        return new PostAlarmDetailResponse(
                alarm.getTargetId(),
                alarm.getDetail(),
                nickname
        );
    }

}
