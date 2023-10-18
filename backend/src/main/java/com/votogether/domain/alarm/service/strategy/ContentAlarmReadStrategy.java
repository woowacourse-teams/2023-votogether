package com.votogether.domain.alarm.service.strategy;

import com.votogether.domain.alarm.entity.Alarm;
import com.votogether.domain.alarm.exception.AlarmExceptionType;
import com.votogether.domain.alarm.repository.AlarmRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.global.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class ContentAlarmReadStrategy implements AlarmReadStrategy {

    private final AlarmRepository alarmRepository;

    @Override
    public void read(final Long id, final Member member) {
        final Alarm alarm = alarmRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(AlarmExceptionType.NOT_FOUND));

        alarm.checkOwner(member);
        alarm.read();
    }

}
