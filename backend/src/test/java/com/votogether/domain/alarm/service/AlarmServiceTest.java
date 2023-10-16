package com.votogether.domain.alarm.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.domain.alarm.dto.ReportActionAlarmResponse;
import com.votogether.domain.alarm.dto.ReportActionResponse;
import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.repository.ReportActionAlarmRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.test.ServiceTest;
import java.util.List;
import java.util.Set;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

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
                .reasons("광고성, 부적합성")
                .target("1")
                .build();

        reportActionAlarmRepository.save(reportActionAlarmA);

        // when
        List<ReportActionAlarmResponse> reportActionAlarms = alarmService.getReportActionAlarms(member, 0);

        // then
        ReportActionAlarmResponse result = reportActionAlarms.get(0);
        assertAll(
                () -> assertThat(reportActionAlarms.size()).isEqualTo(1),
                () -> assertThat(result.alarmId()).isNotNull(),
                () -> assertThat(result.isChecked()).isFalse(),
                () -> assertThat(result.detail().reportActionId()).isNotNull(),
                () -> assertThat(result.detail().target()).isEqualTo("1"),
                () -> assertThat(result.detail().reasons()).containsAll(Set.of("광고성", "부적합성")),
                () -> assertThat(result.detail().type()).isEqualTo(ReportType.POST)
        );
    }

    @Test
    @DisplayName("신고조치알림을 상세 조회한다.")
    void getReportActionAlarm() {
        // given
        Member member = memberTestPersister.builder().save();

        ReportActionAlarm reportActionAlarmA = ReportActionAlarm.builder()
                .reportType(ReportType.POST)
                .member(member)
                .isChecked(false)
                .reasons("광고성, 부적합성")
                .target("1")
                .build();

        ReportActionAlarm savedReportActionAlarm = reportActionAlarmRepository.save(reportActionAlarmA);

        // when
        ReportActionResponse response = alarmService.getReportActionAlarm(savedReportActionAlarm.getId(), member);

        // then
        assertAll(
                () -> assertThat(response.reportActionId()).isEqualTo(savedReportActionAlarm.getId()),
                () -> assertThat(response.type()).isEqualTo(ReportType.POST),
                () -> assertThat(response.target()).isEqualTo("1"),
                () -> assertThat(response.reasons()).containsAll(Set.of("광고성", "부적합성"))
        );
    }

}
