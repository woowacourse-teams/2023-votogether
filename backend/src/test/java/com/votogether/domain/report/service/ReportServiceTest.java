package com.votogether.domain.report.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import com.votogether.ServiceTest;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.domain.post.repository.CommentRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.report.dto.ReportRequest;
import com.votogether.domain.report.entity.ReportType;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.exception.BadRequestException;
import com.votogether.exception.NotFoundException;
import com.votogether.fixtures.MemberFixtures;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@ServiceTest
class ReportServiceTest {

    @Autowired
    ReportService reportService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    CommentRepository commentRepository;

    @Nested
    @DisplayName("게시글 신고")
    class reportPost {

        @Test
        @DisplayName("투표글 신고가 되는지 확인한다.")
        void ReportPost() {
            // given
            Member reporter = memberRepository.save(MemberFixtures.FEMALE_60.get());
            Member writer = memberRepository.save(MemberFixtures.FEMALE_30.get());

            PostBody postBody = PostBody.builder()
                    .title("title")
                    .content("content")
                    .build();

            Post post = Post.builder()
                    .writer(writer)
                    .postBody(postBody)
                    .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                    .build();

            postRepository.save(post);

            ReportRequest request = new ReportRequest(ReportType.POST.name(), post.getId(), "불건전한 게시글");

            // when, then
            assertDoesNotThrow(() -> reportService.report(reporter, request));
        }

        @Test
        @DisplayName("없는 투표글을 신고하는 경우 예외가 발생한다.")
        void reportNonExistPostThrowsException() {
            // given
            Member writer = memberRepository.save(MemberFixtures.FEMALE_30.get());

            ReportRequest request = new ReportRequest(ReportType.POST.name(), -1L, "불건전한 게시글");

            // when, then
            assertThatThrownBy(() -> reportService.report(writer, request))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("해당 게시글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("자신의 투표글을 신고하는 경우 예외가 발생한다.")
        void reportOwnPostThrowsException() {
            // given
            Member writer = memberRepository.save(MemberFixtures.FEMALE_30.get());

            PostBody postBody = PostBody.builder()
                    .title("title")
                    .content("content")
                    .build();

            Post post = Post.builder()
                    .writer(writer)
                    .postBody(postBody)
                    .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                    .build();

            postRepository.save(post);

            ReportRequest request = new ReportRequest(ReportType.POST.name(), post.getId(), "불건전한 게시글");

            // when, then
            assertThatThrownBy(() -> reportService.report(writer, request))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("자신의 게시글은 신고할 수 없습니다.");
        }

        @Test
        @DisplayName("블라인드 처리된 투표글을 신고하는 경우 예외가 발생한다.")
        void reportHiddenPost() {
            // given
            Member reporter = memberRepository.save(MemberFixtures.FEMALE_60.get());
            Member writer = memberRepository.save(MemberFixtures.FEMALE_30.get());

            PostBody postBody = PostBody.builder()
                    .title("title")
                    .content("content")
                    .build();

            Post post = Post.builder()
                    .writer(writer)
                    .postBody(postBody)
                    .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                    .isHidden(true)
                    .build();

            postRepository.save(post);

            ReportRequest request = new ReportRequest(ReportType.POST.name(), post.getId(), "불건전한 게시글");

            // when, then
            assertThatThrownBy(() -> reportService.report(reporter, request))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("이미 블라인드 처리된 글입니다.");
        }

        @Test
        @DisplayName("하나의 회원이 투표글을 중복하여 신고하면 예외를 던진다.")
        void reportDuplicated() {
            // given
            Member reporter = memberRepository.save(MemberFixtures.FEMALE_20.get());
            Member writer = memberRepository.save(MemberFixtures.FEMALE_EARLY_10.get());

            PostBody postBody = PostBody.builder()
                    .title("title")
                    .content("content")
                    .build();

            Post post = Post.builder()
                    .writer(writer)
                    .postBody(postBody)
                    .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                    .build();

            postRepository.save(post);

            ReportRequest request = new ReportRequest(ReportType.POST.name(), post.getId(), "불건전한 게시글");

            // when
            reportService.report(reporter, request);

            // then
            assertThatThrownBy(() -> reportService.report(reporter, request))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("하나의 글에 대해서 중복하여 신고할 수 없습니다.");
        }

        @Test
        @DisplayName("투표글 신고가 5회가 되면 블라인드 처리가 된다.")
        void reportAndBlind() {
            // given
            Member reporter1 = memberRepository.save(MemberFixtures.FEMALE_20.get());
            Member reporter2 = memberRepository.save(MemberFixtures.FEMALE_30.get());
            Member reporter3 = memberRepository.save(MemberFixtures.FEMALE_40.get());
            Member reporter4 = memberRepository.save(MemberFixtures.FEMALE_50.get());
            Member reporter5 = memberRepository.save(MemberFixtures.FEMALE_60.get());
            Member writer = memberRepository.save(MemberFixtures.FEMALE_EARLY_10.get());

            PostBody postBody = PostBody.builder()
                    .title("title")
                    .content("content")
                    .build();

            Post post = Post.builder()
                    .writer(writer)
                    .postBody(postBody)
                    .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                    .build();

            postRepository.save(post);

            ReportRequest request = new ReportRequest(ReportType.POST.name(), post.getId(), "불건전한 게시글");

            // when
            reportService.report(reporter1, request);
            reportService.report(reporter2, request);
            reportService.report(reporter3, request);
            reportService.report(reporter4, request);
            reportService.report(reporter5, request);

            // then
            assertThat(post.isHidden()).isTrue();
        }

    }

    @Nested
    @DisplayName("댓글 신고")
    class ReportComment {

        @Test
        @DisplayName("댓글 신고가 되는지 확인한다.")
        void reportComment() {
            // given
            Member reporter = memberRepository.save(MemberFixtures.FEMALE_60.get());
            Member writer = memberRepository.save(MemberFixtures.FEMALE_30.get());

            PostBody postBody = PostBody.builder()
                    .title("title")
                    .content("content")
                    .build();

            Post post = Post.builder()
                    .writer(writer)
                    .postBody(postBody)
                    .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                    .build();

            Comment comment = Comment.builder()
                    .post(post)
                    .member(writer)
                    .content("으어어어어")
                    .isHidden(false)
                    .build();

            postRepository.save(post);
            commentRepository.save(comment);

            ReportRequest request = new ReportRequest(ReportType.COMMENT.name(), comment.getId(), "불건전한 게시글");

            // when, then
            assertDoesNotThrow(() -> reportService.report(reporter, request));
        }

        @Test
        @DisplayName("없는 댓글을 신고하는 경우 예외가 발생한다.")
        void reportNonExistCommentThrowsException() {
            // given
            Member writer = memberRepository.save(MemberFixtures.FEMALE_30.get());

            ReportRequest request = new ReportRequest(ReportType.COMMENT.name(), -1L, "불건전한 댓글");

            // when, then
            assertThatThrownBy(() -> reportService.report(writer, request))
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

            Post post = Post.builder()
                    .writer(writer)
                    .postBody(postBody)
                    .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                    .build();

            Comment comment = Comment.builder()
                    .post(post)
                    .member(writer)
                    .content("으어어어어")
                    .isHidden(false)
                    .build();

            postRepository.save(post);
            commentRepository.save(comment);

            ReportRequest request = new ReportRequest(ReportType.COMMENT.name(), comment.getId(), "불건전한 댓글");

            // when, then
            assertThatThrownBy(() -> reportService.report(writer, request))
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

            Post post = Post.builder()
                    .writer(writer)
                    .postBody(postBody)
                    .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                    .isHidden(true)
                    .build();

            Comment comment = Comment.builder()
                    .post(post)
                    .member(writer)
                    .content("으어어어어")
                    .isHidden(true)
                    .build();

            postRepository.save(post);
            commentRepository.save(comment);

            ReportRequest request = new ReportRequest(ReportType.COMMENT.name(), comment.getId(), "불건전한 댓글");

            // when, then
            assertThatThrownBy(() -> reportService.report(reporter, request))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("이미 블라인드 처리된 댓글입니다.");
        }

        @Test
        @DisplayName("하나의 회원이 댓글을 중복하여 신고하면 예외를 던진다.")
        void reportDuplicated() {
            // given
            Member reporter = memberRepository.save(MemberFixtures.FEMALE_20.get());
            Member writer = memberRepository.save(MemberFixtures.FEMALE_EARLY_10.get());

            PostBody postBody = PostBody.builder()
                    .title("title")
                    .content("content")
                    .build();

            Post post = Post.builder()
                    .writer(writer)
                    .postBody(postBody)
                    .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                    .build();

            Comment comment = Comment.builder()
                    .post(post)
                    .member(writer)
                    .content("으어어어어")
                    .isHidden(false)
                    .build();

            postRepository.save(post);
            commentRepository.save(comment);

            ReportRequest request = new ReportRequest(ReportType.COMMENT.name(), comment.getId(), "불건전한 댓글");

            // when
            reportService.report(reporter, request);

            // then
            assertThatThrownBy(() -> reportService.report(reporter, request))
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
            Member writer = memberRepository.save(MemberFixtures.FEMALE_EARLY_10.get());

            PostBody postBody = PostBody.builder()
                    .title("title")
                    .content("content")
                    .build();

            Post post = Post.builder()
                    .writer(writer)
                    .postBody(postBody)
                    .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                    .build();

            Comment comment = Comment.builder()
                    .post(post)
                    .member(writer)
                    .content("으어어어어")
                    .isHidden(false)
                    .build();

            postRepository.save(post);
            commentRepository.save(comment);

            ReportRequest request = new ReportRequest(ReportType.COMMENT.name(), comment.getId(), "불건전한 댓글");

            // when
            reportService.report(reporter1, request);
            reportService.report(reporter2, request);
            reportService.report(reporter3, request);
            reportService.report(reporter4, request);
            reportService.report(reporter5, request);

            // then
            assertThat(comment.isHidden()).isTrue();
        }

    }

}
