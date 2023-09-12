package com.votogether.domain.report.service.strategy;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.domain.post.entity.comment.Content;
import com.votogether.domain.post.service.PostCommentService;
import com.votogether.domain.report.dto.request.ReportRequest;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import com.votogether.test.annotation.ServiceTest;
import com.votogether.test.fixtures.MemberFixtures;
import com.votogether.test.persister.CommentTestPersister;
import com.votogether.test.persister.PostTestPersister;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@ServiceTest
@DisplayName("댓글 신고기능은")
class ReportCommentStrategyTest {

    @Autowired
    ReportCommentStrategy reportCommentStrategy;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PostTestPersister postTestPersister;

    @Autowired
    PostCommentService postCommentService;

    @Autowired
    CommentTestPersister commentTestPersister;

    @Test
    @DisplayName("정상적으로 동작한다.")
    void reportComment() {
        // given
        Member reporter = memberRepository.save(MemberFixtures.FEMALE_60.get());
        Member writer = memberRepository.save(MemberFixtures.FEMALE_30.get());

        PostBody postBody = PostBody.builder()
                .title("title")
                .content("content")
                .build();

        Post post = postTestPersister.builder()
                .writer(writer)
                .postBody(postBody)
                .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                .save();

        Comment comment = commentTestPersister.builder()
                .post(post)
                .member(writer)
                .content(new Content("으어어어어"))
                .save();

        ReportRequest request = new ReportRequest(ReportType.COMMENT, comment.getId(), "불건전한 게시글");

        // when, then
        assertDoesNotThrow(() -> reportCommentStrategy.report(reporter, request));
    }

    @Test
    @DisplayName("없는 댓글을 신고하는 경우 예외가 발생한다.")
    void reportNonExistCommentThrowsException() {
        // given
        Member writer = memberRepository.save(MemberFixtures.FEMALE_30.get());

        ReportRequest request = new ReportRequest(ReportType.COMMENT, -1L, "불건전한 댓글");

        // when, then
        assertThatThrownBy(() -> reportCommentStrategy.report(writer, request))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("해당 댓글이 존재하지 않습니다.");
    }

    @Test
    @DisplayName("자신의 댓글을 신고하는 경우 예외가 발생한다.")
    void reportOwnCommentThrowsException() {
        // given
        Member writer = memberRepository.save(MemberFixtures.FEMALE_30.get());

        PostBody postBody = PostBody.builder()
                .title("title")
                .content("content")
                .build();

        Post post = postTestPersister.builder()
                .writer(writer)
                .postBody(postBody)
                .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                .save();

        Comment comment = commentTestPersister.builder()
                .post(post)
                .member(writer)
                .content(new Content("으어어어어"))
                .save();

        ReportRequest request = new ReportRequest(ReportType.COMMENT, comment.getId(), "불건전한 댓글");

        // when, then
        assertThatThrownBy(() -> reportCommentStrategy.report(writer, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("자신의 댓글은 신고할 수 없습니다.");
    }

    @Test
    @DisplayName("블라인드 처리된 댓글을 신고하는 경우 예외가 발생한다.")
    void reportHiddenComment() {
        // given
        Member reporter = memberRepository.save(MemberFixtures.FEMALE_60.get());
        Member writer = memberRepository.save(MemberFixtures.FEMALE_30.get());

        PostBody postBody = PostBody.builder()
                .title("title")
                .content("content")
                .build();

        Post post = postTestPersister.builder()
                .writer(writer)
                .postBody(postBody)
                .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                .save();

        Comment comment = commentTestPersister.builder()
                .post(post)
                .member(writer)
                .content(new Content("으어어어어"))
                .save();

        ReportRequest request = new ReportRequest(ReportType.COMMENT, comment.getId(), "불건전한 댓글");

        // when, then
        comment.blind();
        assertThatThrownBy(() -> reportCommentStrategy.report(reporter, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("이미 블라인드 처리된 댓글입니다.");
    }

    @Test
    @DisplayName("하나의 회원이 댓글을 중복하여 신고하면 예외를 던진다.")
    void reportDuplicated() {
        // given
        Member reporter = memberRepository.save(MemberFixtures.FEMALE_20.get());
        Member writer = memberRepository.save(MemberFixtures.FEMALE_10.get());

        PostBody postBody = PostBody.builder()
                .title("title")
                .content("content")
                .build();

        Post post = postTestPersister.builder()
                .writer(writer)
                .postBody(postBody)
                .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                .save();

        Comment comment = commentTestPersister.builder()
                .post(post)
                .member(writer)
                .content(new Content("으어어어어"))
                .save();

        ReportRequest request = new ReportRequest(ReportType.COMMENT, comment.getId(), "불건전한 댓글");

        // when
        reportCommentStrategy.report(reporter, request);

        // then
        assertThatThrownBy(() -> reportCommentStrategy.report(reporter, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("하나의 댓글에 대해서 중복하여 신고할 수 없습니다.");
    }

    @Test
    @DisplayName("댓글 신고가 5회가 되면 블라인드 처리가 된다.")
    void reportAndBlind() {
        // given
        Member reporter1 = memberRepository.save(MemberFixtures.FEMALE_20.get());
        Member reporter2 = memberRepository.save(MemberFixtures.FEMALE_30.get());
        Member reporter3 = memberRepository.save(MemberFixtures.FEMALE_40.get());
        Member reporter4 = memberRepository.save(MemberFixtures.FEMALE_50.get());
        Member reporter5 = memberRepository.save(MemberFixtures.FEMALE_60.get());
        Member writer = memberRepository.save(MemberFixtures.FEMALE_10.get());

        PostBody postBody = PostBody.builder()
                .title("title")
                .content("content")
                .build();

        Post post = postTestPersister.builder()
                .writer(writer)
                .postBody(postBody)
                .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                .save();

        Comment comment = commentTestPersister.builder()
                .post(post)
                .member(writer)
                .content(new Content("으어어어어"))
                .save();

        ReportRequest request = new ReportRequest(ReportType.COMMENT, comment.getId(), "불건전한 댓글");

        // when
        reportCommentStrategy.report(reporter1, request);
        reportCommentStrategy.report(reporter2, request);
        reportCommentStrategy.report(reporter3, request);
        reportCommentStrategy.report(reporter4, request);
        reportCommentStrategy.report(reporter5, request);

        // then
        assertAll(
                () -> assertThat(comment.isHidden()).isTrue(),
                () -> assertThat(postCommentService.getComments(post.getId())).isEmpty()
        );
    }

}
