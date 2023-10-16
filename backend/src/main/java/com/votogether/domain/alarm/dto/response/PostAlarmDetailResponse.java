package com.votogether.domain.alarm.dto.response;

import com.votogether.domain.alarm.entity.Alarm;

public record PostAlarmDetailResponse(
        Long postId,
        String postTitle,
        String commentWriter
) {

    public static PostAlarmDetailResponse of(final Alarm alarm, final String nickname) {
        return new PostAlarmDetailResponse(
                alarm.getTargetId(),
                alarm.getDetail(),
                nickname
        );
    }

}
