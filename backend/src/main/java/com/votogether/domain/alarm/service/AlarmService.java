package com.votogether.domain.alarm.service;

import com.votogether.domain.alarm.dto.ReportActionAlarmResponse;
import com.votogether.domain.alarm.dto.ReportActionResponse;
import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.repository.ReportActionAlarmRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.repository.ReportRepository;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AlarmService {

    private final ReportActionAlarmRepository reportActionAlarmRepository;
    private final ReportRepository reportRepository;

    public List<ReportActionAlarmResponse> getReportActionAlarms(final Member member, final int page) {
        final PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(Sort.Direction.DESC, "createdAt"));
        final List<ReportActionAlarm> reportActionAlarms = reportActionAlarmRepository.findByMember(member,
                pageRequest);
        return reportActionAlarms.stream()
                .map(ReportActionAlarmResponse::from)
                .toList();
    }

    public ReportActionResponse getReportAction(final Long reportActionAlarmId, final Member member) {
        final ReportActionAlarm reportActionAlarm = reportActionAlarmRepository.findByIdAndMember(reportActionAlarmId,
                        member)
                .orElseThrow(IllegalArgumentException::new);
        final List<Report> reports = reportRepository.findAllByReportActionAlarm(reportActionAlarm);
        final Set<String> reasons = reports.stream()
                .map(Report::getReason)
                .collect(Collectors.toSet());
        return ReportActionResponse.of(reportActionAlarm, reasons);
    }

}
