package com.votogether.domain.report.repository;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.report.dto.ReportAggregateDto;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.domain.report.exception.ReportExceptionType;
import com.votogether.global.exception.NotFoundException;
import com.votogether.test.RepositoryTest;
import com.votogether.test.fixtures.MemberFixtures;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
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
    void getReportAggregateDtos() {
        // given
        Member member = memberRepository.save(MemberFixtures.MALE_30.get());

        Report savedReportA = reportTestPersister.builder()
                .member(member)
                .reportType(ReportType.POST)
                .reason("reasonA")
                .targetId(1L)
                .save();

        Report savedReportB = reportTestPersister.builder()
                .member(member)
                .reportType(ReportType.COMMENT)
                .reason("reasonB")
                .targetId(1L)
                .save();

        ReportAggregateDto reportAggregateDtoA = new ReportAggregateDto(
                savedReportA.getId(),
                savedReportA.getReportType(),
                savedReportA.getTargetId(),
                savedReportA.getReason(),
                savedReportA.getCreatedAt()
        );

        ReportAggregateDto reportAggregateDtoB = new ReportAggregateDto(
                savedReportB.getId(),
                savedReportB.getReportType(),
                savedReportB.getTargetId(),
                savedReportB.getReason(),
                savedReportB.getCreatedAt()
        );

        PageRequest pageRequest = PageRequest.of(0, 20);

        // when
        List<ReportAggregateDto> reports = reportCustomRepository
                .findReportAggregateDtosByReportTypeAndTargetId(pageRequest);

        // then
        assertSoftly(softly -> {
            equalTo(softly, reports.get(0), reportAggregateDtoB);
            equalTo(softly, reports.get(1), reportAggregateDtoA);
        });
    }

    private void equalTo(
            SoftAssertions softly,
            ReportAggregateDto actualReport,
            ReportAggregateDto expectReport
    ) {
        softly.assertThat(actualReport).usingRecursiveComparison()
                .withEqualsForType(
                        (createdAtA, createdAtB) -> createdAtA.truncatedTo(ChronoUnit.SECONDS)
                                .isEqual(createdAtB.truncatedTo(ChronoUnit.SECONDS)),
                        LocalDateTime.class)
                .ignoringFields("member", "updatedAt")
                .isEqualTo(expectReport);
    }

    @Test
    @DisplayName("신고 조치 예정 정보를 조회한다")
    void getReportAggregateDto() {
        // given
        Member memberA = memberRepository.save(MemberFixtures.MALE_30.get());
        Member memberB = memberRepository.save(MemberFixtures.MALE_20.get());

        ReportType reportType = ReportType.POST;
        long targetId = 1L;

        String reasonA = "reasonA";
        reportTestPersister.builder()
                .member(memberA)
                .reportType(reportType)
                .reason(reasonA)
                .targetId(targetId)
                .save();

        String reasonB = "reasonB";
        Report savedReportB = reportTestPersister.builder()
                .member(memberB)
                .reportType(reportType)
                .reason(reasonB)
                .targetId(targetId)
                .save();

        // when
        ReportAggregateDto reportAggregateDto = reportCustomRepository
                .findReportAggregateDtoByReportTypeAndTargetId(reportType, targetId)
                .orElseThrow(() -> new NotFoundException(ReportExceptionType.NOT_FOUND));

        // then
        assertSoftly(softly -> {
            softly.assertThat(reportAggregateDto.reportMaxId()).isEqualTo(savedReportB.getId());
            softly.assertThat(reportAggregateDto.reportType()).isEqualTo(reportType);
            softly.assertThat(reportAggregateDto.targetId()).isEqualTo(targetId);
            softly.assertThat(reportAggregateDto.reasons()).contains(reasonA, reasonB);
            softly.assertThat(reportAggregateDto.createdAt().truncatedTo(ChronoUnit.SECONDS))
                    .isEqualTo(savedReportB.getCreatedAt().truncatedTo(ChronoUnit.SECONDS));
        });
    }

}
