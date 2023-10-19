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
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.domain.post.service.PostCommentService;
import com.votogether.domain.report.dto.ReportAggregateDto;
import com.votogether.domain.report.dto.request.ReportRequest;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import com.votogether.test.ServiceTest;
import com.votogether.test.fixtures.MemberFixtures;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@DisplayName("댓글 신고기능은")
class ReportCommentStrategyTest extends ServiceTest {

    @Autowired
    ReportCommentStrategy reportCommentStrategy;

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    ReportActionAlarmRepository reportActionAlarmRepository;

    @Autowired
    PostCommentService postCommentService;

    @Autowired
    MemberService memberService;

    @Test
    @DisplayName("정상적으로 동작한다.")
    void reportComment() {
        // given
        Member reporter = memberTestPersister.builder().save();
        Post post = postTestPersister.postBuilder().save();
        Comment comment = commentTestPersister.builder().post(post).save();
        ReportRequest request = new ReportRequest(ReportType.COMMENT, comment.getId(), "불건전한 게시글");

        // when, then
        assertDoesNotThrow(() -> reportCommentStrategy.report(reporter, request));
    }

    @Test
    @DisplayName("없는 댓글을 신고하는 경우 예외가 발생한다.")
    void reportNonExistCommentThrowsException() {
        // given
        Member writer = memberTestPersister.builder().save();
        ReportRequest request = new ReportRequest(ReportType.COMMENT, -1L, "불건전한 댓글");

        // when, then
        assertThatThrownBy(() -> reportCommentStrategy.report(writer, request))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("댓글이 존재하지 않습니다.");
    }

    @Test
    @DisplayName("자신의 댓글을 신고하는 경우 예외가 발생한다.")
    void reportOwnCommentThrowsException() {
        // given
        Member writer = memberTestPersister.builder().save();
        Post post = postTestPersister.postBuilder().save();
        Comment comment = commentTestPersister.builder().post(post).writer(writer).save();
        ReportRequest request = new ReportRequest(ReportType.COMMENT, comment.getId(), "불건전한 댓글");

        // when, then
        assertThatThrownBy(() -> reportCommentStrategy.report(writer, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("본인 댓글은 신고할 수 없습니다.");
    }

    @Test
    @DisplayName("블라인드 처리된 댓글을 신고하는 경우 예외가 발생한다.")
    void reportHiddenComment() {
        // given
        Member reporter = memberTestPersister.builder().save();
        Post post = postTestPersister.postBuilder().save();
        Comment comment = commentTestPersister.builder().post(post).save();
        ReportRequest request = new ReportRequest(ReportType.COMMENT, comment.getId(), "불건전한 댓글");

        // when, then
        comment.blind();
        assertThatThrownBy(() -> reportCommentStrategy.report(reporter, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("신고에 의해 숨겨진 댓글은 접근할 수 없습니다.");
    }

    @Test
    @DisplayName("하나의 회원이 댓글을 중복하여 신고하면 예외를 던진다.")
    void reportDuplicated() {
        // given
        Member reporter = memberTestPersister.builder().save();
        Post post = postTestPersister.postBuilder().save();
        Comment comment = commentTestPersister.builder().post(post).save();
        ReportRequest request = new ReportRequest(ReportType.COMMENT, comment.getId(), "불건전한 댓글");

        // when
        reportCommentStrategy.report(reporter, request);

        // then
        assertThatThrownBy(() -> reportCommentStrategy.report(reporter, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("하나의 댓글에 대해서 중복하여 신고할 수 없습니다.");
    }

    @Test
    @DisplayName("targetId를 통해 comment의 내용을 가져온다")
    void parseTarget() {
        // given
        String savedCommentContent = "commentA";
        Comment comment = commentTestPersister.builder()
                .content(savedCommentContent)
                .save();

        // when
        String content = reportCommentStrategy.parseTarget(comment.getId());

        // then
        assertThat(content).isEqualTo(savedCommentContent);
    }

    @Test
    @DisplayName("댓글에 대한 신고 조치를 한다.")
    void commentReportAction() {
        // given
        Member writer = memberService.register(MemberFixtures.MALE_30.get());
        Member reporter = memberService.register(MemberFixtures.MALE_20.get());

        Comment comment = commentTestPersister.builder()
                .writer(writer)
                .content("commnetA")
                .save();

        Report savedReport = reportTestPersister.builder()
                .member(reporter)
                .reportType(ReportType.COMMENT)
                .reason("reasonA")
                .targetId(comment.getId())
                .save();

        ReportAggregateDto reportAggregateDto = new ReportAggregateDto(
                savedReport.getId(),
                savedReport.getReportType(),
                comment.getId(),
                savedReport.getReason(),
                savedReport.getCreatedAt()
        );

        // when
        reportCommentStrategy.reportAction(reportAggregateDto);

        // then
        ReportActionAlarm reportActionAlarm = reportActionAlarmRepository.findAll().get(0);

        assertSoftly(softly -> {
            softly.assertThat(reportActionAlarm.getMember().getId()).isEqualTo(writer.getId());
            softly.assertThat(reportActionAlarm.getReportType()).isEqualTo(savedReport.getReportType());
            softly.assertThat(reportActionAlarm.getTarget()).isEqualTo(comment.getContent());
            softly.assertThat(reportActionAlarm.getReasons()).isEqualTo(savedReport.getReason());
            softly.assertThat(reportActionAlarm.isChecked()).isFalse();
            softly.assertThat(comment.isHidden()).isTrue();
        });
    }

    @Test
    @DisplayName("댓글이 존재하지 않는 경우 예외 발생")
    void commentNotExistException() {
        // given
        Member writer = memberService.register(MemberFixtures.MALE_30.get());
        Member reporter = memberService.register(MemberFixtures.MALE_20.get());

        Comment comment = commentTestPersister.builder()
                .writer(writer)
                .content("commnetA")
                .save();

        Report savedReport = reportTestPersister.builder()
                .member(reporter)
                .reportType(ReportType.COMMENT)
                .reason("reasonA")
                .targetId(comment.getId())
                .save();

        ReportAggregateDto reportAggregateDto = new ReportAggregateDto(
                savedReport.getId(),
                savedReport.getReportType(),
                comment.getId() + 1L,
                savedReport.getReason(),
                savedReport.getCreatedAt()
        );

        // when, then
        assertThatThrownBy(() -> reportCommentStrategy.reportAction(reportAggregateDto))
                .isInstanceOf(NotFoundException.class);
    }

}
