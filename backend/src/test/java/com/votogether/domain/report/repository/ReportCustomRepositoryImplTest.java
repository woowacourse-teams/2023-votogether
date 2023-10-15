package com.votogether.domain.report.repository;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.test.RepositoryTest;
import com.votogether.test.fixtures.MemberFixtures;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import org.assertj.core.api.RecursiveComparisonAssert;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;

class ReportCustomRepositoryImplTest extends RepositoryTest {

    @Autowired
    ReportCustomRepositoryImpl reportCustomRepository;

    @Autowired
    MemberRepository memberRepository;

    @Test
    @DisplayName("신고 조치 예정 목록을 최신순으로 조회한다")
    void getReports() {
        // given
        final Member member = memberRepository.save(MemberFixtures.MALE_30.get());

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
                .targetId(1L)
                .save();

        final PageRequest pageRequest = PageRequest.of(0, 20);

        // when
        final List<Report> reports = reportCustomRepository
                .findReportsGroupedByMemberAndReportTypeAndTargetId(pageRequest);

        // then
        assertSoftly(softly -> {
            equalTo(softly, reports.get(0), savedReportB);
            equalTo(softly, reports.get(1), savedReportA);
        });
    }

    private RecursiveComparisonAssert<?> equalTo(
            final SoftAssertions softly,
            final Report actualReport,
            final Report expectReport
    ) {
        return softly.assertThat(actualReport).usingRecursiveComparison()
                .withEqualsForType(
                        (createdAtA, createdAtB) -> createdAtA.truncatedTo(ChronoUnit.SECONDS)
                                .isEqual(createdAtB.truncatedTo(ChronoUnit.SECONDS)),
                        LocalDateTime.class)
                .ignoringFields("member", "updatedAt")
                .isEqualTo(expectReport);
    }

}
