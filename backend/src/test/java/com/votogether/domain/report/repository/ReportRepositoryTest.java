package com.votogether.domain.report.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.votogether.domain.alarm.repository.ReportActionAlarmRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.test.RepositoryTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class ReportRepositoryTest extends RepositoryTest {

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    ReportActionAlarmRepository reportActionAlarmRepository;

    @Test
    @DisplayName("회원, 신고타입, 대상ID를 통해서 신고 횟수를 반환한다.")
    void countByMemberAndReportTypeAndTargetId() {
        // given
        memberTestPersister.builder().save();
        Post post = postTestPersister.postBuilder().save();
        reportTestPersister.builder().reportType(ReportType.POST).targetId(post.getId()).save();

        // when
        int reportCount = reportRepository.countByReportTypeAndTargetId(ReportType.POST, post.getId());

        // then
        assertThat(reportCount).isEqualTo(1);
    }

    @Test
    @DisplayName("회원, 신고유형, 신고대상ID를 통해 해당 신고정보를 반환한다.")
    void findByMemberAndReportTypeAndTargetId() {
        // given
        Member member = memberTestPersister.builder().save();
        Post post = postTestPersister.postBuilder().save();
        reportTestPersister.builder().member(member).reportType(ReportType.POST).targetId(post.getId()).save();

        // when
        Report actualReport = reportRepository.findByMemberAndReportTypeAndTargetId(
                member,
                ReportType.POST,
                post.getId()
        ).get();

        // then
        assertSoftly(softly -> {
            softly.assertThat(actualReport.getTargetId()).isEqualTo(post.getId());
            softly.assertThat(actualReport.getMember()).isEqualTo(member);
            softly.assertThat(actualReport.getReportType()).isEqualTo(ReportType.POST);
        });
    }

    @Test
    @DisplayName("신고 유형, 신고대상ID를 통해 모든 신고 정보를 삭제한다.")
    void deleteAllWithReportTypeAndTargetIdInBatch() {
        // given
        Member reporterA = memberTestPersister.builder().save();
        Member reporterB = memberTestPersister.builder().save();
        Post post = postTestPersister.postBuilder().save();
        reportTestPersister.builder().member(reporterA).reportType(ReportType.POST).targetId(post.getId()).save();
        reportTestPersister.builder().member(reporterB).reportType(ReportType.POST).targetId(post.getId()).save();

        // when
        reportRepository.deleteAllWithReportTypeAndTargetIdInBatch(ReportType.POST, post.getId());

        // then
        assertThat(reportRepository.findAll()).isEmpty();
    }

}
