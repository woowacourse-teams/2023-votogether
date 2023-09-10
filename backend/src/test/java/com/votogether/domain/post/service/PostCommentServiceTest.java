package com.votogether.domain.post.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.comment.CommentCreateRequest;
import com.votogether.domain.post.dto.request.comment.CommentUpdateRequest;
import com.votogether.domain.post.dto.response.comment.CommentResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import com.votogether.test.ServiceTest;
import com.votogether.test.fixtures.MemberFixtures;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class PostCommentServiceTest extends ServiceTest {

    @Autowired
    PostCommentService postCommentService;

    @Nested
    @DisplayName("게시글 댓글 목록 조회")
    class GetComments {

        @Test
        @DisplayName("게시글 댓글 목록을 조회한다.")
        void getComments() {
            // given
            Member writer = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(writer).save();
            Comment commentA = commentTestPersister.builder().post(post).writer(writer).save();
            Comment commentB = commentTestPersister.builder().post(post).writer(writer).save();

            // when
            List<CommentResponse> response = postCommentService.getComments(post.getId());

            // then
            assertThat(response).usingRecursiveComparison()
                    .isEqualTo(List.of(CommentResponse.from(commentA), CommentResponse.from(commentB)));
        }

        @Test
        @DisplayName("존재하지 않는 게시글이라면 예외를 던진다.")
        void emptyPost() {
            // given, when, then
            assertThatThrownBy(() -> postCommentService.getComments(-1L))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("게시글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("블라인드된 게시글이라면 예외를 던진다.")
        void blindPost() {
            // given
            Post post = postTestPersister.postBuilder().save();
            post.blind();

            // when, then
            assertThatThrownBy(() -> postCommentService.getComments(post.getId()))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("신고에 의해 숨겨진 게시글은 접근할 수 없습니다.");
        }

    }

    @Nested
    @DisplayName("게시글 댓글 등록")
    class CreateComment {

        @Test
        @DisplayName("게시글에 댓글을 등록한다.")
        void createComment() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();
            CommentCreateRequest commentCreateRequest = new CommentCreateRequest("hello");

            // when
            postCommentService.createComment(post.getId(), commentCreateRequest, member);

            // then
            assertThat(postCommentService.getComments(post.getId())).hasSize(1);
        }

        @Test
        @DisplayName("존재하지 않는 게시글이라면 예외를 던진다.")
        void emptyPost() {
            // given
            Member member = MemberFixtures.MALE_20.get();
            CommentCreateRequest commentCreateRequest = new CommentCreateRequest("hello");

            // when, then
            assertThatThrownBy(() -> postCommentService.createComment(-1L, commentCreateRequest, member))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("게시글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("블라인드된 게시글이라면 예외를 던진다.")
        void blindPost() {
            // given
            Member member = MemberFixtures.MALE_20.get();
            CommentCreateRequest commentCreateRequest = new CommentCreateRequest("hello");
            Post post = postTestPersister.postBuilder().save();
            post.blind();

            // when, then
            assertThatThrownBy(() -> postCommentService.createComment(post.getId(), commentCreateRequest, member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("신고에 의해 숨겨진 게시글은 접근할 수 없습니다.");
        }

    }

    @Nested
    @DisplayName("게시글 댓글 수정")
    class UpdateComment {

        @Test
        @DisplayName("게시글의 댓글을 수정한다.")
        void deleteComment() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();
            Comment comment = commentTestPersister.builder().post(post).writer(member).save();
            CommentUpdateRequest request = new CommentUpdateRequest("hello");

            // when
            postCommentService.updateComment(post.getId(), comment.getId(), request, member);

            // then
            assertThat(comment.getContent()).isEqualTo("hello");
        }

        @Test
        @DisplayName("존재하지 않는 게시글이라면 예외를 던진다.")
        void emptyPost() {
            // given
            Member member = MemberFixtures.MALE_20.get();
            CommentUpdateRequest request = new CommentUpdateRequest("hello");

            // when, then
            assertThatThrownBy(() -> postCommentService.updateComment(-1L, 1L, request, member))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("게시글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("존재하지 않는 댓글이라면 예외를 던진다.")
        void emptyComment() {
            // given
            Member member = MemberFixtures.MALE_20.get();
            Post post = postTestPersister.postBuilder().save();
            CommentUpdateRequest request = new CommentUpdateRequest("hello");

            // when, then
            assertThatThrownBy(() -> postCommentService.updateComment(post.getId(), -1L, request, member))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("댓글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("블라인드된 게시글이라면 예외를 던진다.")
        void blindPost() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();
            Comment comment = commentTestPersister.builder().post(post).writer(member).save();
            CommentUpdateRequest request = new CommentUpdateRequest("hello");
            post.blind();

            // when, then
            assertThatThrownBy(() -> postCommentService.updateComment(post.getId(), comment.getId(), request, member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("신고에 의해 숨겨진 게시글은 접근할 수 없습니다.");
        }

        @Test
        @DisplayName("블라인드된 댓글이라면 예외를 던진다.")
        void blindComment() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();
            Comment comment = commentTestPersister.builder().post(post).writer(member).save();
            CommentUpdateRequest request = new CommentUpdateRequest("hello");
            comment.blind();

            // when, then
            assertThatThrownBy(() -> postCommentService.updateComment(post.getId(), comment.getId(), request, member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("신고에 의해 숨겨진 댓글은 접근할 수 없습니다.");
        }

        @Test
        @DisplayName("댓글의 게시글과 일치하지 않으면 예외를 던진다.")
        void invalidBelongPost() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();
            Comment comment = commentTestPersister.builder().writer(member).save();
            CommentUpdateRequest request = new CommentUpdateRequest("hello");

            // when, then
            assertThatThrownBy(() -> postCommentService.updateComment(post.getId(), comment.getId(), request, member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("게시글의 댓글이 아닙니다.");
        }

        @Test
        @DisplayName("댓글의 작성자가 아니라면 예외를 던진다.")
        void invalidWriter() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();
            Comment comment = commentTestPersister.builder().post(post).save();
            CommentUpdateRequest request = new CommentUpdateRequest("hello");

            // when, then
            assertThatThrownBy(() -> postCommentService.updateComment(post.getId(), comment.getId(), request, member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("댓글 작성자가 아닙니다.");
        }

    }

    @Nested
    @DisplayName("게시글 댓글 삭제")
    class DeleteComment {

        @Test
        @DisplayName("게시글의 댓글을 삭제한다.")
        void deleteComment() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();
            Comment comment = commentTestPersister.builder().post(post).writer(member).save();

            // when
            postCommentService.deleteComment(post.getId(), comment.getId(), member);

            // then
            assertThat(postCommentService.getComments(post.getId())).isEmpty();
        }

        @Test
        @DisplayName("존재하지 않는 게시글이라면 예외를 던진다.")
        void emptyPost() {
            // given
            Member member = MemberFixtures.MALE_20.get();

            // when, then
            assertThatThrownBy(() -> postCommentService.deleteComment(-1L, 1L, member))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("게시글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("존재하지 않는 댓글이라면 예외를 던진다.")
        void emptyComment() {
            // given
            Member member = MemberFixtures.MALE_20.get();
            Post post = postTestPersister.postBuilder().save();

            // when, then
            assertThatThrownBy(() -> postCommentService.deleteComment(post.getId(), -1L, member))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("댓글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("블라인드된 게시글이라면 예외를 던진다.")
        void blindPost() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();
            Comment comment = commentTestPersister.builder().post(post).writer(member).save();
            post.blind();

            // when, then
            assertThatThrownBy(() -> postCommentService.deleteComment(post.getId(), comment.getId(), member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("신고에 의해 숨겨진 게시글은 접근할 수 없습니다.");
        }

        @Test
        @DisplayName("블라인드된 댓글이라면 예외를 던진다.")
        void blindComment() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();
            Comment comment = commentTestPersister.builder().post(post).writer(member).save();
            comment.blind();

            // when, then
            assertThatThrownBy(() -> postCommentService.deleteComment(post.getId(), comment.getId(), member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("신고에 의해 숨겨진 댓글은 접근할 수 없습니다.");
        }

        @Test
        @DisplayName("댓글의 게시글과 일치하지 않으면 예외를 던진다.")
        void invalidBelongPost() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();
            Comment comment = commentTestPersister.builder().writer(member).save();

            // when, then
            assertThatThrownBy(() -> postCommentService.deleteComment(post.getId(), comment.getId(), member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("게시글의 댓글이 아닙니다.");
        }

        @Test
        @DisplayName("댓글의 작성자가 아니라면 예외를 던진다.")
        void invalidWriter() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();
            Comment comment = commentTestPersister.builder().post(post).save();

            // when, then
            assertThatThrownBy(() -> postCommentService.deleteComment(post.getId(), comment.getId(), member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("댓글 작성자가 아닙니다.");
        }

    }

}
