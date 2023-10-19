package com.votogether.domain.alarm.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.domain.alarm.entity.Alarm;
import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.entity.vo.AlarmType;
import com.votogether.domain.alarm.repository.AlarmRepository;
import com.votogether.domain.alarm.repository.ReportActionAlarmRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.global.exception.NotFoundException;
import com.votogether.test.ServiceTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class AlarmCommandServiceTest extends ServiceTest {

    @Autowired
    AlarmCommandService alarmCommandService;

    @Autowired
    AlarmRepository alarmRepository;

    @Autowired
    ReportActionAlarmRepository reportActionAlarmRepository;

    @Nested
    @DisplayName("알림을 읽을 시")
    class ReadAlarm {

        @Test
        @DisplayName("정상적인 요청이라면 알림을 읽는다.")
        void readAlarm() {
            // given
            Member member = memberTestPersister.builder().save();
            Alarm alarm = Alarm.builder()
                    .member(member)
                    .alarmType(AlarmType.COMMENT)
                    .commentWriterNickname("nickname")
                    .targetId(1L)
                    .detail("detail")
                    .isChecked(false)
                    .build();
            alarmRepository.save(alarm);
            String type = "CONTENT";

            // when
            alarmCommandService.readAlarm(alarm.getId(), type, member);

            // then
            assertThat(alarm.isChecked()).isTrue();
        }

        @Test
        @DisplayName("정상적인 요청이라면 신고 알림을 읽는다.")
        void readReportAlarm() {
            // given
            Member member = memberTestPersister.builder().save();
            ReportActionAlarm reportActionAlarm = ReportActionAlarm.builder()
                    .member(member)
                    .reportType(ReportType.POST)
                    .target("target")
                    .reasons("reasons")
                    .isChecked(false)
                    .build();
            reportActionAlarmRepository.save(reportActionAlarm);
            String type = "REPORT";

            // when
            alarmCommandService.readAlarm(reportActionAlarm.getId(), type, member);
        }

        @Test
        @DisplayName("알림이 존재하지 않으면 예외를 던진다.")
        void notExistAlarm() {
            // given
            Member member = memberTestPersister.builder().save();
            String type = "CONTENT";

            // when, then
            assertThatThrownBy(() -> alarmCommandService.readAlarm(-1L, type, member))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("알림이 존재하지 않습니다.");
        }

    }

}
