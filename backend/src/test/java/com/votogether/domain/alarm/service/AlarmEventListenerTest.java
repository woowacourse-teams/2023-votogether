package com.votogether.domain.alarm.service;

import com.votogether.domain.alarm.dto.event.PostAlarmEvent;
import com.votogether.domain.alarm.entity.Alarm;
import com.votogether.domain.alarm.entity.vo.AlarmType;
import com.votogether.domain.alarm.repository.AlarmRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.test.ServiceTest;
import java.util.List;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.transaction.TestTransaction;

class AlarmEventListenerTest extends ServiceTest {

    @Autowired
    private AlarmEventListener alarmEventListener;

    @Autowired
    private AlarmRepository alarmRepository;

    @Test
    @DisplayName("게시글 관련 알림 이벤트를 수신한다.")
    void handlePostAlarmEvent() {
        // given
        Member member = memberTestPersister.builder().save();
        PostAlarmEvent postAlarmEvent = new PostAlarmEvent(member, 1L, AlarmType.COMMENT, "title");

        // when
        alarmEventListener.handlePostAlarmEvent(postAlarmEvent);

        TestTransaction.flagForCommit();
        TestTransaction.end();

        TestTransaction.start();

        // then
        List<Alarm> alarms = alarmRepository.findAll();
        Alarm alarm = alarms.get(0);
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(alarms).hasSize(1);
            softly.assertThat(alarm.getTargetId()).isEqualTo(1L);
            softly.assertThat(alarm.getAlarmType()).isEqualTo(AlarmType.COMMENT);
            softly.assertThat(alarm.getDetail()).isEqualTo("title");
        });
    }

}
