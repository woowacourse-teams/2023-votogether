package com.votogether.domain.alarm.entity;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.domain.alarm.entity.vo.AlarmType;
import com.votogether.domain.member.entity.Member;
import com.votogether.test.fixtures.MemberFixtures;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class AlarmTest {

    @Test
    @DisplayName("알림을 읽으면 읽음 여부가 TRUE로 수정된다.")
    void readAlarm() {
        // given
        Member member = MemberFixtures.MALE_30.get();
        Alarm alarm = Alarm.builder()
                .member(member)
                .alarmType(AlarmType.COMMENT)
                .targetId(1L)
                .detail("detail")
                .isChecked(false)
                .build();

        // when
        alarm.read();

        // then
        assertThat(alarm.isChecked()).isTrue();
    }

}
