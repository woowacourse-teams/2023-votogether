package com.votogether.domain.alarm.service;

import com.votogether.domain.alarm.dto.ReportActionAlarmResponse;
import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.repository.ReportActionAlarmRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.test.ServiceTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

class AlarmServiceTest extends ServiceTest {

    @Autowired
    AlarmService alarmService;

    @Autowired
    ReportActionAlarmRepository reportActionAlarmRepository;

    @Test
    @DisplayName("신고조치알림 목록을 조회한다.")
    void getReportActionAlarms() {
        // given
        Member member = memberTestPersister.builder().save();

        ReportActionAlarm reportActionAlarmA = ReportActionAlarm.builder()
                .reportType(ReportType.POST)
                .member(member)
                .isChecked(false)
                .target("1")
                .build();

        reportActionAlarmRepository.save(reportActionAlarmA);

        // when
        List<ReportActionAlarmResponse> reportActionAlarms = alarmService.getReportActionAlarms(member, 0);

        // then
        ReportActionAlarmResponse result = reportActionAlarms.get(0);
        assertAll(
                () -> assertThat(reportActionAlarms.size()).isEqualTo(1),
                () -> assertThat(result.id()).isNotNull(),
                () -> assertThat(result.isChecked()).isFalse(),
                () -> assertThat(result.reportActionResponse().id()).isNotNull(),
                () -> assertThat(result.reportActionResponse().target()).isEqualTo("1"),
                () -> assertThat(result.reportActionResponse().type()).isEqualTo(ReportType.POST)
        );
    }

}
