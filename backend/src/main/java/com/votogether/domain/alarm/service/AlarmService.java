package com.votogether.domain.alarm.service;

import com.votogether.domain.alarm.dto.ReportActionAlarmResponse;
import com.votogether.domain.alarm.dto.ReportActionResponse;
import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.exception.ReportActionAlarmExceptionType;
import com.votogether.domain.alarm.repository.ReportActionAlarmRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.global.exception.NotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AlarmService {

    private final ReportActionAlarmRepository reportActionAlarmRepository;

    @Transactional(readOnly = true)
    public List<ReportActionAlarmResponse> getReportActionAlarms(final Member member, final int page) {
        final PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(Sort.Direction.DESC, "createdAt"));
        final List<ReportActionAlarm> reportActionAlarms = reportActionAlarmRepository
                .findByMember(member, pageRequest);

        return reportActionAlarms.stream()
                .map(ReportActionAlarmResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public ReportActionResponse getReportActionAlarm(final Long reportActionAlarmId, final Member member) {
        final ReportActionAlarm reportActionAlarm = reportActionAlarmRepository
                .findByIdAndMember(reportActionAlarmId, member)
                .orElseThrow(() -> new NotFoundException(ReportActionAlarmExceptionType.NOT_FOUND));

        return ReportActionResponse.from(reportActionAlarm);
    }

}
