package com.votogether.domain.alarm.dto.event;

import com.votogether.domain.alarm.entity.vo.AlarmType;
import com.votogether.domain.member.entity.Member;

public record PostAlarmEvent(
        Member member,
        String commentWriterNickname,
        Long targetId,
        AlarmType alarmType,
        String detail
) {
}
