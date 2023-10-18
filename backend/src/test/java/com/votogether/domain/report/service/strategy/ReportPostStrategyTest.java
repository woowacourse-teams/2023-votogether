package com.votogether.domain.report.service.strategy;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.repository.ReportActionAlarmRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.service.MemberService;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.service.PostGuestService;
import com.votogether.domain.report.dto.ReportAggregateDto;
import com.votogether.domain.report.dto.request.ReportRequest;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import com.votogether.test.ServiceTest;
import com.votogether.test.fixtures.MemberFixtures;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@DisplayName("게시글 신고 기능은")
class ReportPostStrategyTest extends ServiceTest {

    @Autowired
    ReportPostStrategy reportPostStrategy;

    @Autowired
    PostGuestService postGuestService;

    @Autowired
    MemberService memberService;

    @Autowired
    ReportActionAlarmRepository reportActionAlarmRepository;

    @Autowired
    ReportRepository reportRepository;


    @Test
    @DisplayName("정상적으로 동작한다.")
    void reportPost() {
        // given
        Member reporter = memberTestPersister.builder().save();
        Post post = postTestPersister.postBuilder().save();
        ReportRequest request = new ReportRequest(ReportType.POST, post.getId(), "불건전한 게시글");

        // when, then
        assertDoesNotThrow(() -> reportPostStrategy.report(reporter, request));
    }

    @Test
    @DisplayName("없는 투표글을 신고하는 경우 예외가 발생한다.")
    void reportNonExistPostThrowsException() {
        // given
        Member writer = memberTestPersister.builder().save();
        ReportRequest request = new ReportRequest(ReportType.POST, -1L, "불건전한 게시글");

        // when, then
        assertThatThrownBy(() -> reportPostStrategy.report(writer, request))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("게시글이 존재하지 않습니다.");
    }

    @Test
    @DisplayName("자신의 투표글을 신고하는 경우 예외가 발생한다.")
    void reportOwnPostThrowsException() {
        // given
        Member writer = memberTestPersister.builder().save();
        Post post = postTestPersister.postBuilder().writer(writer).save();
        ReportRequest request = new ReportRequest(ReportType.POST, post.getId(), "불건전한 게시글");

        // when, then
        assertThatThrownBy(() -> reportPostStrategy.report(writer, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("본인 게시글은 신고할 수 없습니다.");
    }

    @Test
    @DisplayName("블라인드 처리된 투표글을 신고하는 경우 예외가 발생한다.")
    void reportHiddenPost() {
        // given
        Member reporter = memberTestPersister.builder().save();
        Post post = postTestPersister.postBuilder().save();
        post.blind();
        ReportRequest request = new ReportRequest(ReportType.POST, post.getId(), "불건전한 게시글");

        // when, then
        assertThatThrownBy(() -> reportPostStrategy.report(reporter, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("신고에 의해 숨겨진 게시글은 접근할 수 없습니다.");
    }

    @Test
    @DisplayName("하나의 회원이 투표글을 중복하여 신고하면 예외를 던진다.")
    void reportDuplicated() {
        // given
        Member reporter = memberTestPersister.builder().save();
        Post post = postTestPersister.postBuilder().save();
        ReportRequest request = new ReportRequest(ReportType.POST, post.getId(), "불건전한 게시글");

        // when
        reportPostStrategy.report(reporter, request);

        // then
        assertThatThrownBy(() -> reportPostStrategy.report(reporter, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("하나의 글에 대해서 중복하여 신고할 수 없습니다.");
    }

    @Test
    @DisplayName("targetId를 문자열로 파싱한다.")
    void parseTarget() {
        // given
        Post post = postTestPersister.postBuilder().save();

        // when
        String postId = reportPostStrategy.parseTarget(post.getId());

        // then
        assertThat(postId).isEqualTo(post.getId().toString());
    }

    @Test
    @DisplayName("게시글에 대한 신고 조치를 한다.")
    void postReportAction() {
        // given
        Member reporter = memberService.register(MemberFixtures.MALE_20.get());
        Member writer = memberService.register(MemberFixtures.MALE_30.get());

        Post post = postTestPersister.postBuilder()
                .writer(writer)
                .title("title")
                .content("content")
                .deadline(LocalDateTime.now())
                .save();

        Report savedReport = reportTestPersister.builder()
                .member(reporter)
                .reportType(ReportType.POST)
                .reason("reasonA")
                .targetId(post.getId())
                .save();

        ReportAggregateDto reportAggregateDto = new ReportAggregateDto(
                savedReport.getId(),
                savedReport.getReportType(),
                post.getId(),
                savedReport.getReason(),
                savedReport.getCreatedAt()
        );

        // when
        reportPostStrategy.reportAction(reportAggregateDto);

        // then
        ReportActionAlarm reportActionAlarm = reportActionAlarmRepository.findAll().get(0);

        assertSoftly(softly -> {
            softly.assertThat(reportActionAlarm.getMember().getId()).isEqualTo(writer.getId());
            softly.assertThat(reportActionAlarm.getReportType()).isEqualTo(savedReport.getReportType());
            softly.assertThat(reportActionAlarm.getTarget()).isEqualTo(post.getId().toString());
            softly.assertThat(reportActionAlarm.getReasons()).isEqualTo(savedReport.getReason());
            softly.assertThat(reportActionAlarm.isChecked()).isFalse();
            softly.assertThat(post.isHidden()).isTrue();
        });
    }

    @Test
    @DisplayName("게시글이 존재하지 않는 경우 예외 발생")
    void postNotExistException() {
        // given
        Member reporter = memberService.register(MemberFixtures.MALE_20.get());
        Member member = memberService.register(MemberFixtures.MALE_30.get());

        Report savedReport = reportTestPersister.builder()
                .member(reporter)
                .reportType(ReportType.NICKNAME)
                .reason("reasonA")
                .targetId(member.getId())
                .save();

        ReportAggregateDto reportAggregateDto = new ReportAggregateDto(
                savedReport.getId(),
                savedReport.getReportType(),
                member.getId() + 1L,
                savedReport.getReason(),
                savedReport.getCreatedAt()
        );

        // when, then
        assertThatThrownBy(() -> reportPostStrategy.reportAction(reportAggregateDto))
                .isInstanceOf(NotFoundException.class);
    }

}
