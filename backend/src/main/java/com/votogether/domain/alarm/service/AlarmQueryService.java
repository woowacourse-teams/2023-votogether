package com.votogether.domain.alarm.service;

import com.votogether.domain.alarm.dto.ReportActionAlarmResponse;
import com.votogether.domain.alarm.dto.ReportActionResponse;
import com.votogether.domain.alarm.dto.response.PostAlarmResponse;
import com.votogether.domain.alarm.entity.Alarm;
import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.entity.vo.AlarmType;
import com.votogether.domain.alarm.exception.ReportActionAlarmExceptionType;
import com.votogether.domain.alarm.repository.AlarmRepository;
import com.votogether.domain.alarm.repository.ReportActionAlarmRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.global.exception.NotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class AlarmQueryService {

    private static final int BASIC_PAGE_SIZE = 10;
    private static final String NICKNAME_WHEN_POST_CLOSING = "";

    private final AlarmRepository alarmRepository;
    private final ReportActionAlarmRepository reportActionAlarmRepository;

    public List<PostAlarmResponse> getPostAlarm(final Member member, final int page) {
        final PageRequest pageRequest = PageRequest.of(page, BASIC_PAGE_SIZE);
        final Slice<Alarm> alarms = alarmRepository.findAllByMemberOrderByCreatedAtDesc(member, pageRequest);

        return getPostAlarmResponses(alarms);
    }

    private List<PostAlarmResponse> getPostAlarmResponses(final Slice<Alarm> alarms) {
        return alarms.stream()
                .map(alarm -> {
                    final String nickname = makeNicknameBy(alarm);
                    return PostAlarmResponse.of(alarm, nickname);
                })
                .toList();
    }

    private String makeNicknameBy(final Alarm alarm) {
        if (alarm.getAlarmType() == AlarmType.POST_DEADLINE) {
            return NICKNAME_WHEN_POST_CLOSING;
        }
        final Member member = alarm.getMember();
        return member.getNickname();
    }

    public List<ReportActionAlarmResponse> getReportActionAlarms(final Member member, final int page) {
        final PageRequest pageRequest = PageRequest.of(page, BASIC_PAGE_SIZE,
                Sort.by(Sort.Direction.DESC, "createdAt"));
        final List<ReportActionAlarm> reportActionAlarms = reportActionAlarmRepository
                .findByMember(member, pageRequest);

        return reportActionAlarms.stream()
                .map(ReportActionAlarmResponse::from)
                .toList();
    }

    public ReportActionResponse getReportActionAlarm(final Long reportActionAlarmId, final Member member) {
        final ReportActionAlarm reportActionAlarm = reportActionAlarmRepository
                .findByIdAndMember(reportActionAlarmId, member)
                .orElseThrow(() -> new NotFoundException(ReportActionAlarmExceptionType.NOT_FOUND));

        return ReportActionResponse.from(reportActionAlarm);
    }

}
