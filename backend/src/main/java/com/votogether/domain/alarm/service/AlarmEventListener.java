package com.votogether.domain.alarm.service;

import com.votogether.domain.alarm.dto.event.PostAlarmEvent;
import com.votogether.domain.alarm.entity.Alarm;
import com.votogether.domain.alarm.repository.AlarmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;

@RequiredArgsConstructor
@Component
public class AlarmEventListener {

    private final AlarmRepository alarmRepository;

    @Async
    @TransactionalEventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handlePostAlarmEvent(final PostAlarmEvent postAlarmEvent) {
        final Alarm alarm = Alarm.builder()
                .member(postAlarmEvent.member())
                .alarmType(postAlarmEvent.alarmType())
                .commentWriterNickname(postAlarmEvent.commentWriterNickname())
                .targetId(postAlarmEvent.targetId())
                .detail(postAlarmEvent.detail())
                .isChecked(false)
                .build();
        alarmRepository.save(alarm);
    }

}
