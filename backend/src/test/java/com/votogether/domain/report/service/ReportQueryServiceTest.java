package com.votogether.domain.report.service;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.service.MemberService;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.domain.report.dto.response.ReportResponse;
import com.votogether.domain.report.dto.response.ReportsPageResponse;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.test.ServiceTest;
import com.votogether.test.fixtures.MemberFixtures;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class ReportQueryServiceTest extends ServiceTest {

    @Autowired
    ReportQueryService reportQueryService;

    @Autowired
    MemberService memberService;

    @Test
    @DisplayName("신고 조치 예정 목록을 최신순으로 조회한다")
    void getReports() {
        // given
        final Member member = memberService.register(MemberFixtures.MALE_30.get());

        final Comment comment = commentTestPersister.builder()
                .content("commnetA")
                .save();

        final Report savedReportA = reportTestPersister.builder()
                .member(member)
                .reportType(ReportType.POST)
                .reason("reasonA")
                .targetId(1L)
                .save();

        final Report savedReportB = reportTestPersister.builder()
                .member(member)
                .reportType(ReportType.COMMENT)
                .reason("reasonB")
                .targetId(comment.getId())
                .save();

        // when
        final ReportsPageResponse reportsPageResponse = reportQueryService.getReports(0);

        // then
        final List<ReportResponse> reportResponses = reportsPageResponse.reports();
        assertSoftly(softly -> {
            softly.assertThat(reportsPageResponse.totalPageNumber()).isOne();
            softly.assertThat(reportsPageResponse.currentPageNumber()).isOne();
            softly.assertThat(reportResponses.get(0).id()).isEqualTo(savedReportB.getId());
            softly.assertThat(reportResponses.get(0).type()).isEqualTo(savedReportB.getReportType());
            softly.assertThat(reportResponses.get(0).reasons().get(0)).isEqualTo(savedReportB.getReason());
            softly.assertThat(reportResponses.get(0).target()).isEqualTo(comment.getContent());
            softly.assertThat(reportResponses.get(1).id()).isEqualTo(savedReportA.getId());
            softly.assertThat(reportResponses.get(1).type()).isEqualTo(savedReportA.getReportType());
            softly.assertThat(reportResponses.get(1).reasons().get(0)).isEqualTo(savedReportA.getReason());
            softly.assertThat(reportResponses.get(1).target()).isEqualTo(savedReportA.getTargetId().toString());
        });
    }

}
