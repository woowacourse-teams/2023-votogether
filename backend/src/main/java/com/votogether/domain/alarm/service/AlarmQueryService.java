package com.votogether.domain.alarm.service;

import com.votogether.domain.alarm.dto.response.PostAlarmResponse;
import com.votogether.domain.alarm.dto.response.ReportActionAlarmResponse;
import com.votogether.domain.alarm.dto.response.ReportActionResponse;
import com.votogether.domain.alarm.entity.Alarm;
import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.exception.AlarmExceptionType;
import com.votogether.domain.alarm.repository.AlarmRepository;
import com.votogether.domain.alarm.repository.ReportActionAlarmRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.global.exception.NotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class AlarmQueryService {

    private static final int BASIC_PAGE_SIZE = 10;

    private final AlarmRepository alarmRepository;
    private final ReportActionAlarmRepository reportActionAlarmRepository;

    public List<PostAlarmResponse> getPostAlarm(final Member member, final int page) {
        final PageRequest pageRequest = PageRequest.of(page, BASIC_PAGE_SIZE);
        final Slice<Alarm> alarms = alarmRepository.findAllByMemberOrderByCreatedAtDesc(member, pageRequest);

        return alarms.stream()
                .map(PostAlarmResponse::of)
                .toList();
    }

    public List<ReportActionAlarmResponse> getReportActionAlarms(final Member member, final int page) {
        final PageRequest pageRequest = PageRequest.of(page, BASIC_PAGE_SIZE);
        final List<ReportActionAlarm> reportActionAlarms = reportActionAlarmRepository
                .findByMemberOrderByIdDesc(member, pageRequest);

        return reportActionAlarms.stream()
                .map(ReportActionAlarmResponse::from)
                .toList();
    }

    public ReportActionResponse getReportActionAlarm(final Long reportActionAlarmId, final Member member) {
        final ReportActionAlarm reportActionAlarm = reportActionAlarmRepository
                .findByIdAndMember(reportActionAlarmId, member)
                .orElseThrow(() -> new NotFoundException(AlarmExceptionType.NOT_FOUND_ACTION));

        return ReportActionResponse.from(reportActionAlarm);
    }

}
