package com.votogether.domain.alarm.repository;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.test.RepositoryTest;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;

class ReportActionAlarmRepositoryTest extends RepositoryTest {

    @Autowired
    ReportActionAlarmRepository reportActionAlarmRepository;

    @Test
    @DisplayName("신고조치알림을 최신순으로 가져온다")
    void getInLatestOrder() {
        // given
        Member member = memberTestPersister.builder().save();

        ReportActionAlarm reportActionAlarmA = ReportActionAlarm.builder()
                .reportType(ReportType.POST)
                .member(member)
                .isChecked(false)
                .target("1")
                .reasons("광고성, 부적합성")
                .build();

        ReportActionAlarm reportActionAlarmB = ReportActionAlarm.builder()
                .reportType(ReportType.NICKNAME)
                .member(member)
                .isChecked(false)
                .target("닉네임")
                .reasons("광고성, 부적합성")
                .build();

        ReportActionAlarm reportActionAlarmC = ReportActionAlarm.builder()
                .reportType(ReportType.COMMENT)
                .member(member)
                .isChecked(false)
                .target("댓글내용")
                .reasons("광고성, 부적합성")
                .build();

        reportActionAlarmRepository.save(reportActionAlarmA);
        reportActionAlarmRepository.save(reportActionAlarmB);
        reportActionAlarmRepository.save(reportActionAlarmC);

        // when
        PageRequest pageRequest = PageRequest.of(0, 10);
        List<ReportActionAlarm> reportActionAlarms = reportActionAlarmRepository
                .findByMemberOrderByIdDesc(member, pageRequest);

        // then
        assertSoftly(softly -> {
            softly.assertThat(reportActionAlarms).hasSize(3);
            softly.assertThat(reportActionAlarms.get(0).getReportType()).isEqualTo(
                    reportActionAlarmC.getReportType());
            softly.assertThat(reportActionAlarms.get(1).getReportType()).isEqualTo(
                    reportActionAlarmB.getReportType());
            softly.assertThat(reportActionAlarms.get(2).getReportType()).isEqualTo(
                    reportActionAlarmA.getReportType());
        });
    }

    @Test
    @DisplayName("신고조치알림을 10개씩 가져온다.")
    void getWithTen() {
        // given
        Member member = memberTestPersister.builder().save();

        for (int i = 0; i < 11; i++) {
            ReportActionAlarm reportActionAlarm = ReportActionAlarm.builder()
                    .reportType(ReportType.POST)
                    .member(member)
                    .isChecked(false)
                    .target(String.valueOf(i))
                    .reasons("광고성, 부적합성")
                    .build();
            reportActionAlarmRepository.save(reportActionAlarm);
        }

        // when
        PageRequest pageRequestA = PageRequest.of(0, 10);
        List<ReportActionAlarm> reportActionAlarmsA = reportActionAlarmRepository
                .findByMemberOrderByIdDesc(member, pageRequestA);

        PageRequest pageRequestB = PageRequest.of(1, 10);
        List<ReportActionAlarm> reportActionAlarmsB = reportActionAlarmRepository
                .findByMemberOrderByIdDesc(member, pageRequestB);

        // then
        assertSoftly(softly -> {
                    softly.assertThat(reportActionAlarmsA).hasSize(10);
                    softly.assertThat(reportActionAlarmsB).hasSize(1);
                }
        );
    }

}
