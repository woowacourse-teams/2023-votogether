package com.votogether.domain.alarm.service.strategy;

import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.exception.AlarmExceptionType;
import com.votogether.domain.alarm.repository.ReportActionAlarmRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.global.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class ReportAlarmReadStrategy implements AlarmReadStrategy {

    private final ReportActionAlarmRepository reportActionAlarmRepository;

    @Override
    public void read(final Long id, final Member member) {
        final ReportActionAlarm reportActionAlarm = reportActionAlarmRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(AlarmExceptionType.NOT_FOUND_ACTION));

        reportActionAlarm.checkOwner(member);
        reportActionAlarm.read();
    }

}
