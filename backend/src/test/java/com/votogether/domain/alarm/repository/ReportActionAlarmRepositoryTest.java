package com.votogether.domain.alarm.repository;

import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.test.RepositoryTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

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
                .build();

        ReportActionAlarm reportActionAlarmB = ReportActionAlarm.builder()
                .reportType(ReportType.NICKNAME)
                .member(member)
                .isChecked(false)
                .target("닉네임")
                .build();

        ReportActionAlarm reportActionAlarmC = ReportActionAlarm.builder()
                .reportType(ReportType.COMMENT)
                .member(member)
                .isChecked(false)
                .target("댓글내용")
                .build();

        reportActionAlarmRepository.save(reportActionAlarmA);
        reportActionAlarmRepository.save(reportActionAlarmB);
        reportActionAlarmRepository.save(reportActionAlarmC);

        // when
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "createdAt"));
        List<ReportActionAlarm> reportActionAlarms = reportActionAlarmRepository.findByMember(member, pageRequest);

        // then
        assertAll(
                () -> assertThat(reportActionAlarms.size()).isEqualTo(3),
                () -> assertThat(reportActionAlarms.get(0).getReportType()).isEqualTo(reportActionAlarmC.getReportType()),
                () -> assertThat(reportActionAlarms.get(1).getReportType()).isEqualTo(reportActionAlarmB.getReportType()),
                () -> assertThat(reportActionAlarms.get(2).getReportType()).isEqualTo(reportActionAlarmA.getReportType())
        );
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
                    .build();
            reportActionAlarmRepository.save(reportActionAlarm);
        }

        // when
        PageRequest pageRequestA = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "createdAt"));
        List<ReportActionAlarm> reportActionAlarmsA = reportActionAlarmRepository.findByMember(member, pageRequestA);

        PageRequest pageRequestB = PageRequest.of(1, 10, Sort.by(Sort.Direction.DESC, "createdAt"));
        List<ReportActionAlarm> reportActionAlarmsB = reportActionAlarmRepository.findByMember(member, pageRequestB);

        // then
        assertAll(
                () -> assertThat(reportActionAlarmsA.size()).isEqualTo(10),
                () -> assertThat(reportActionAlarmsB.size()).isEqualTo(1)
        );
    }

}
