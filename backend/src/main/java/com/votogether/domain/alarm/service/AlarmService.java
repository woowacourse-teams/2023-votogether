package com.votogether.domain.alarm.service;

import com.votogether.domain.alarm.dto.response.PostAlarmResponse;
import com.votogether.domain.alarm.entity.Alarm;
import com.votogether.domain.alarm.entity.vo.AlarmType;
import com.votogether.domain.alarm.repository.AlarmRepository;
import com.votogether.domain.member.entity.Member;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AlarmService {

    private static final int BASIC_PAGE_SIZE = 10;
    private static final String NICKNAME_WHEN_POST_CLOSING = "";

    private final AlarmRepository alarmRepository;

    @Transactional(readOnly = true)
    public List<PostAlarmResponse> getPostAlarm(final int page) {
        final PageRequest pageRequest = PageRequest.of(page, BASIC_PAGE_SIZE);
        final Slice<Alarm> alarms = alarmRepository.findAllBy(pageRequest);

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

}
