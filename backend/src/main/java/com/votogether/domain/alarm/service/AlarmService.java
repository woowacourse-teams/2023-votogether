package com.votogether.domain.alarm.service;

import com.votogether.domain.alarm.dto.ReportActionAlarmResponse;
import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.repository.ReportActionAlarmRepository;
import com.votogether.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class AlarmService {

    private final ReportActionAlarmRepository reportActionAlarmRepository;

    public List<ReportActionAlarmResponse> getReportActionAlarms(final Member member, final int page) {
        final PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(Sort.Direction.DESC, "createdAt"));
        final List<ReportActionAlarm> reportActionAlarms = reportActionAlarmRepository.findByMember(member, pageRequest);
        return reportActionAlarms.stream()
                .map(ReportActionAlarmResponse::of)
                .toList();
    }

}
