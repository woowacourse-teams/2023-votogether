package com.votogether.domain.alarm.entity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.global.exception.BadRequestException;
import com.votogether.test.fixtures.MemberFixtures;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

class ReportActionAlarmTest {

    @Test
    @DisplayName("알림을 읽으면 읽음 여부가 TRUE로 수정된다.")
    void readAlarm() {
        // given
        Member member = MemberFixtures.MALE_30.get();
        ReportActionAlarm reportActionAlarm = ReportActionAlarm.builder()
                .member(member)
                .reportType(ReportType.POST)
                .target("target")
                .reasons("reasons")
                .isChecked(false)
                .build();

        // when
        reportActionAlarm.read();

        // then
        assertThat(reportActionAlarm.isChecked()).isTrue();
    }

    @Test
    @DisplayName("알림 읽을 대상이 아니라면 예외를 던진다.")
    void checkOwner() {
        // given
        Member member = MemberFixtures.MALE_30.get();
        ReflectionTestUtils.setField(member, "id", 1L);
        ReportActionAlarm reportActionAlarm = ReportActionAlarm.builder()
                .member(member)
                .reportType(ReportType.POST)
                .target("target")
                .reasons("reasons")
                .isChecked(false)
                .build();
        Member other = MemberFixtures.MALE_20.get();

        // when, then
        assertThatThrownBy(() -> reportActionAlarm.checkOwner(other))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("알림을 읽을 대상이 아닙니다.");
    }

}
