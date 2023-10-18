package com.votogether.domain.alarm.service;

import com.votogether.domain.alarm.entity.Alarm;
import com.votogether.domain.alarm.exception.AlarmExceptionType;
import com.votogether.domain.alarm.repository.AlarmRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.global.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class AlarmCommandService {

    private final AlarmRepository alarmRepository;

    public void readAlarm(final Long alarmId, final Member loginMember) {
        final Alarm alarm = alarmRepository.findById(alarmId)
                .orElseThrow(() -> new NotFoundException(AlarmExceptionType.NOT_FOUND));

        alarm.checkOwner(loginMember);
        alarm.read();
    }

}
