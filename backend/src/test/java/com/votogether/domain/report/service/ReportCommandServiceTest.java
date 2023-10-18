package com.votogether.domain.report.service;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.repository.ReportActionAlarmRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.service.MemberService;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.domain.post.repository.CommentRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.post.service.PostCommentService;
import com.votogether.domain.post.service.PostGuestService;
import com.votogether.domain.report.dto.request.ReportActionRequest;
import com.votogether.domain.report.dto.request.ReportRequest;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import com.votogether.test.ServiceTest;
import com.votogether.test.fixtures.MemberFixtures;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class ReportCommandServiceTest extends ServiceTest {

    @Autowired
    ReportCommandService reportCommandService;

    @Autowired
    PostGuestService postGuestService;

    @Autowired
    PostCommentService postCommentService;

    @Autowired
    MemberService memberService;

    @Autowired
    ReportActionAlarmRepository reportActionAlarmRepository;

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommentRepository commentRepository;

    @Nested
    @DisplayName("게시글 신고기능은")
    class ReportPost {

        @Test
        @DisplayName("정상적으로 동작한다.")
        void reportPost() {
            // given
            Member reporter = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();
            ReportRequest request = new ReportRequest(ReportType.POST, post.getId(), "불건전한 게시글");

            // when, then
            assertDoesNotThrow(() -> reportCommandService.report(reporter, request));
        }

        @Test
        @DisplayName("없는 투표글을 신고하는 경우 예외가 발생한다.")
        void reportNonExistPostThrowsException() {
            // given
            Member writer = memberTestPersister.builder().save();
            ReportRequest request = new ReportRequest(ReportType.POST, -1L, "불건전한 게시글");

            // when, then
            assertThatThrownBy(() -> reportCommandService.report(writer, request))
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
            assertThatThrownBy(() -> reportCommandService.report(writer, request))
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
            assertThatThrownBy(() -> reportCommandService.report(reporter, request))
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
            reportCommandService.report(reporter, request);

            // then
            assertThatThrownBy(() -> reportCommandService.report(reporter, request))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("하나의 글에 대해서 중복하여 신고할 수 없습니다.");
        }

    }

    @Nested
    @DisplayName("댓글 신고기능은")
    class ReportComment {

        @Test
        @DisplayName("정상적으로 동작한다.")
        void reportComment() {
            // given
            Member reporter = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();
            Comment comment = commentTestPersister.builder().post(post).save();
            ReportRequest request = new ReportRequest(ReportType.COMMENT, comment.getId(), "불건전한 게시글");

            // when, then
            assertDoesNotThrow(() -> reportCommandService.report(reporter, request));
        }

        @Test
        @DisplayName("없는 댓글을 신고하는 경우 예외가 발생한다.")
        void reportNonExistCommentThrowsException() {
            // given
            Member writer = memberTestPersister.builder().save();
            ReportRequest request = new ReportRequest(ReportType.COMMENT, -1L, "불건전한 댓글");

            // when, then
            assertThatThrownBy(() -> reportCommandService.report(writer, request))
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
            assertThatThrownBy(() -> reportCommandService.report(writer, request))
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
            comment.blind();
            ReportRequest request = new ReportRequest(ReportType.COMMENT, comment.getId(), "불건전한 댓글");

            // when, then
            comment.blind();
            assertThatThrownBy(() -> reportCommandService.report(reporter, request))
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
            reportCommandService.report(reporter, request);

            // then
            assertThatThrownBy(() -> reportCommandService.report(reporter, request))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("하나의 댓글에 대해서 중복하여 신고할 수 없습니다.");
        }

    }

    @Nested
    @DisplayName("닉네임 신고기능은")
    class ReportNickname {

        @Test
        @DisplayName("정상적으로 동작한다.")
        void reportNickname() {
            // given
            Member reporter = memberTestPersister.builder().save();
            Member reported = memberTestPersister.builder().save();
            ReportRequest request = new ReportRequest(ReportType.NICKNAME, reported.getId(), "불건전한 닉네임");

            // when, then
            assertDoesNotThrow(() -> reportCommandService.report(reporter, request));
        }

        @Test
        @DisplayName("자신의 닉네임을 신고하는 경우 예외가 발생한다.")
        void reportOwnNicknameThrowsException() {
            // given
            Member reporter = memberTestPersister.builder().save();
            ReportRequest request = new ReportRequest(ReportType.NICKNAME, reporter.getId(), "불건전한 닉네임");

            // when, then
            assertThatThrownBy(() -> reportCommandService.report(reporter, request))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("자신의 닉네임은 신고할 수 없습니다.");
        }

        @Test
        @DisplayName("하나의 회원이 다른 회원의 닉네임을 중복하여 신고하면 예외를 던진다.")
        void reportDuplicated() {
            // given
            Member reporter = memberTestPersister.builder().save();
            Member reported = memberTestPersister.builder().save();
            ReportRequest request = new ReportRequest(ReportType.NICKNAME, reported.getId(), "불건전한 닉네임");

            // when
            reportCommandService.report(reporter, request);

            // then
            assertThatThrownBy(() -> reportCommandService.report(reporter, request))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("하나의 닉네임에 대해서 중복하여 신고할 수 없습니다.");
        }
    }

    @Nested
    @DisplayName("신고 조치 기능은")
    class ReportAction {

        @Test
        @DisplayName("게시글에 대해 신고 조치를 한다.")
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

            // when
            ReportActionRequest request = new ReportActionRequest(savedReport.getId(), true);
            reportCommandService.reportAction(request);

            // then
            Post savedPost = postRepository.findById(post.getId()).get();
            Optional<Report> reportById = reportRepository.findById(savedReport.getId());
            ReportActionAlarm reportActionAlarm = reportActionAlarmRepository.findAll().get(0);

            assertSoftly(softly -> {
                softly.assertThat(reportById).isEmpty();
                softly.assertThat(reportActionAlarm.getMember().getId()).isEqualTo(writer.getId());
                softly.assertThat(reportActionAlarm.getReportType()).isEqualTo(savedReport.getReportType());
                softly.assertThat(reportActionAlarm.getTarget()).isEqualTo(savedPost.getId().toString());
                softly.assertThat(reportActionAlarm.getReasons()).isEqualTo(savedReport.getReason());
                softly.assertThat(reportActionAlarm.isChecked()).isFalse();
                softly.assertThat(savedPost.isHidden()).isTrue();
            });
        }

        @Test
        @DisplayName("게시글에 대해 신고 조치를 하지 않는다.")
        void postNotReportAction() {
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

            // when
            ReportActionRequest request = new ReportActionRequest(savedReport.getId(), false);
            reportCommandService.reportAction(request);

            // then
            Post savedPost = postRepository.findById(post.getId()).get();
            Optional<Report> reportById = reportRepository.findById(savedReport.getId());
            List<ReportActionAlarm> reportActionAlarms = reportActionAlarmRepository.findAll();

            assertSoftly(softly -> {
                softly.assertThat(reportById).isEmpty();
                softly.assertThat(reportActionAlarms).isEmpty();
                softly.assertThat(savedPost.isHidden()).isFalse();
            });
        }

        @Test
        @DisplayName("댓글에 대해 신고 조치를 한다.")
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

            // when
            ReportActionRequest request = new ReportActionRequest(savedReport.getId(), true);
            reportCommandService.reportAction(request);

            // then
            Comment savedComment = commentRepository.findById(comment.getId()).get();
            Optional<Report> reportById = reportRepository.findById(savedReport.getId());
            ReportActionAlarm reportActionAlarm = reportActionAlarmRepository.findAll().get(0);

            assertSoftly(softly -> {
                softly.assertThat(reportById).isEmpty();
                softly.assertThat(reportActionAlarm.getMember().getId()).isEqualTo(writer.getId());
                softly.assertThat(reportActionAlarm.getReportType()).isEqualTo(savedReport.getReportType());
                softly.assertThat(reportActionAlarm.getTarget()).isEqualTo(savedComment.getContent());
                softly.assertThat(reportActionAlarm.getReasons()).isEqualTo(savedReport.getReason());
                softly.assertThat(reportActionAlarm.isChecked()).isFalse();
                softly.assertThat(savedComment.isHidden()).isTrue();
            });
        }

        @Test
        @DisplayName("댓글에 대해 신고 조치를 하지 않는다.")
        void commentNotReportAction() {
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

            // when
            ReportActionRequest request = new ReportActionRequest(savedReport.getId(), false);
            reportCommandService.reportAction(request);

            // then
            Comment savedComment = commentRepository.findById(comment.getId()).get();
            Optional<Report> reportById = reportRepository.findById(savedReport.getId());
            List<ReportActionAlarm> reportActionAlarms = reportActionAlarmRepository.findAll();

            assertSoftly(softly -> {
                softly.assertThat(reportById).isEmpty();
                softly.assertThat(reportActionAlarms).isEmpty();
                softly.assertThat(savedComment.isHidden()).isFalse();
            });
        }

        @Test
        @DisplayName("닉네임에 대해 신고 조치를 한다.")
        void nicknameReportAction() {
            // given
            Member reporter = memberService.register(MemberFixtures.MALE_20.get());
            Member member = memberService.register(MemberFixtures.MALE_30.get());

            Report savedReport = reportTestPersister.builder()
                    .member(reporter)
                    .reportType(ReportType.NICKNAME)
                    .reason("reasonA")
                    .targetId(member.getId())
                    .save();

            // when
            ReportActionRequest request = new ReportActionRequest(savedReport.getId(), true);
            reportCommandService.reportAction(request);

            // then
            Member savedMember = memberService.findById(member.getId());
            Optional<Report> reportById = reportRepository.findById(savedReport.getId());
            ReportActionAlarm reportActionAlarm = reportActionAlarmRepository.findAll().get(0);

            assertSoftly(softly -> {
                softly.assertThat(reportById).isEmpty();
                softly.assertThat(reportActionAlarm.getMember().getId()).isEqualTo(member.getId());
                softly.assertThat(reportActionAlarm.getReportType()).isEqualTo(savedReport.getReportType());
                softly.assertThat(reportActionAlarm.getTarget()).isNotEqualTo(savedMember.getNickname());
                softly.assertThat(reportActionAlarm.getReasons()).isEqualTo(savedReport.getReason());
                softly.assertThat(reportActionAlarm.isChecked()).isFalse();
            });
        }

        @Test
        @DisplayName("닉네임에 대해 신고 조치를 하지 않는다.")
        void nicknameNotReportAction() {
            // given
            Member reporter = memberService.register(MemberFixtures.MALE_20.get());
            Member member = memberService.register(MemberFixtures.MALE_30.get());

            Report savedReport = reportTestPersister.builder()
                    .member(reporter)
                    .reportType(ReportType.NICKNAME)
                    .reason("reasonA")
                    .targetId(member.getId())
                    .save();

            // when
            ReportActionRequest request = new ReportActionRequest(savedReport.getId(), false);
            reportCommandService.reportAction(request);

            // then
            Member savedMember = memberService.findById(member.getId());
            Optional<Report> reportById = reportRepository.findById(savedReport.getId());
            List<ReportActionAlarm> reportActionAlarms = reportActionAlarmRepository.findAll();

            assertSoftly(softly -> {
                softly.assertThat(reportById).isEmpty();
                softly.assertThat(reportActionAlarms).isEmpty();
                softly.assertThat(member.getNickname()).isEqualTo(savedMember.getNickname());
            });
        }

        @Test
        @DisplayName("신고가 존재하지 않으면 예외 발생.")
        void reportNotExistException() {
            // given
            Member reporter = memberService.register(MemberFixtures.MALE_20.get());
            Member member = memberService.register(MemberFixtures.MALE_30.get());

            Report savedReport = reportTestPersister.builder()
                    .member(reporter)
                    .reportType(ReportType.NICKNAME)
                    .reason("reasonA")
                    .targetId(member.getId())
                    .save();

            // when, then
            ReportActionRequest request = new ReportActionRequest(savedReport.getId() + 1L, true);
            assertThatThrownBy(() -> reportCommandService.reportAction(request))
                    .isInstanceOf(NotFoundException.class);
        }

    }

}
