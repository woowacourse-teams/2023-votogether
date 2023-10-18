package com.votogether.domain.alarm.service;

import com.votogether.domain.alarm.entity.vo.AlarmActionType;
import com.votogether.domain.alarm.service.strategy.AlarmReadStrategy;
import com.votogether.domain.alarm.service.strategy.AlarmReadStrategyProvider;
import com.votogether.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class AlarmCommandService {

    private final AlarmReadStrategyProvider alarmReadStrategyProvider;

    public void readAlarm(
            final Long alarmId,
            final String type,
            final Member loginMember
    ) {
        final AlarmActionType alarmActionType = AlarmActionType.from(type);
        final AlarmReadStrategy alarmReadStrategy = alarmReadStrategyProvider.getStrategy(alarmActionType);
        alarmReadStrategy.read(alarmId, loginMember);
    }

}
