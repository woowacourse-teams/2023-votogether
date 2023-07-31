package com.votogether.domain.post.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.ServiceTest;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.dto.request.CommentRegisterRequest;
import com.votogether.domain.post.dto.request.CommentUpdateRequest;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.domain.post.repository.CommentRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.exception.BadRequestException;
import com.votogether.exception.NotFoundException;
import com.votogether.fixtures.MemberFixtures;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@ServiceTest
class PostCommentServiceTest {

    @Autowired
    PostCommentService postCommentService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommentRepository commentRepository;

    @Nested
    @DisplayName("게시글 댓글 등록")
    class CreateComment {

        @Test
        @DisplayName("존재하지 않는 게시글이라면 예외를 던진다.")
        void emptyPost() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());
            CommentRegisterRequest commentRegisterRequest = new CommentRegisterRequest("hello");

            // when, then
            assertThatThrownBy(() -> postCommentService.createComment(member, -1L, commentRegisterRequest))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("해당 게시글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("게시글에 댓글을 등록한다.")
        void createComment() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());
            Post post = postRepository.save(
                    Post.builder()
                            .writer(member)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                            .build()
            );
            CommentRegisterRequest commentRegisterRequest = new CommentRegisterRequest("hello");

            // when
            postCommentService.createComment(member, post.getId(), commentRegisterRequest);

            // then
            assertThat(commentRepository.findAll()).hasSize(1);
        }

    }

    @Nested
    @DisplayName("게시글 댓글 수정")
    class UpdateComment {

        @Test
        @DisplayName("존재하지 않는 게시글이라면 예외를 던진다.")
        void emptyPost() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());
            CommentUpdateRequest request = new CommentUpdateRequest("hello");

            // when, then
            assertThatThrownBy(() -> postCommentService.updateComment(-1L, 1L, request, member))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("해당 게시글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("존재하지 않는 댓글이라면 예외를 던진다.")
        void emptyComment() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());
            Post post = postRepository.save(
                    Post.builder()
                            .writer(member)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                            .build()
            );
            CommentUpdateRequest request = new CommentUpdateRequest("hello");

            // when, then
            assertThatThrownBy(() -> postCommentService.updateComment(post.getId(), -1L, request, member))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("해당 댓글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("댓글의 게시글과 일치하지 않으면 예외를 던진다.")
        void invalidBelongPost() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());
            Post postA = postRepository.save(
                    Post.builder()
                            .writer(member)
                            .postBody(PostBody.builder().title("titleA").content("contentA").build())
                            .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                            .build()
            );
            Post postB = postRepository.save(
                    Post.builder()
                            .writer(member)
                            .postBody(PostBody.builder().title("titleB").content("contentB").build())
                            .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                            .build()
            );
            Comment comment = commentRepository.save(
                    Comment.builder()
                            .member(member)
                            .post(postA)
                            .content("comment")
                            .build()
            );
            CommentUpdateRequest request = new CommentUpdateRequest("hello");

            // when, then
            assertThatThrownBy(() -> postCommentService.updateComment(postB.getId(), comment.getId(), request, member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("댓글의 게시글 정보와 일치하지 않습니다.");
        }

        @Test
        @DisplayName("댓글의 작성자가 아니라면 예외를 던진다.")
        void invalidWriter() {
            // given
            Member memberA = memberRepository.save(MemberFixtures.MALE_20.get());
            Member memberB = memberRepository.save(MemberFixtures.FEMALE_20.get());
            Post post = postRepository.save(
                    Post.builder()
                            .writer(memberA)
                            .postBody(PostBody.builder().title("titleA").content("contentA").build())
                            .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                            .build()
            );
            Comment comment = commentRepository.save(
                    Comment.builder()
                            .member(memberB)
                            .post(post)
                            .content("comment")
                            .build()
            );
            CommentUpdateRequest request = new CommentUpdateRequest("hello");

            // when, then
            assertThatThrownBy(() -> postCommentService.updateComment(post.getId(), comment.getId(), request, memberA))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("댓글 작성자가 아닙니다.");
        }

        @Test
        @DisplayName("게시글의 댓글을 수정한다.")
        void deleteComment() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());
            Post post = postRepository.save(
                    Post.builder()
                            .writer(member)
                            .postBody(PostBody.builder().title("titleA").content("contentA").build())
                            .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                            .build()
            );
            Comment comment = commentRepository.save(
                    Comment.builder()
                            .member(member)
                            .post(post)
                            .content("comment")
                            .build()
            );
            CommentUpdateRequest request = new CommentUpdateRequest("hello");

            // when
            postCommentService.updateComment(post.getId(), comment.getId(), request, member);

            // then
            assertThat(comment.getContent()).isEqualTo("hello");
        }

    }

    @Nested
    @DisplayName("게시글 댓글 삭제")
    class DeleteComment {

        @Test
        @DisplayName("존재하지 않는 게시글이라면 예외를 던진다.")
        void emptyPost() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());

            // when, then
            assertThatThrownBy(() -> postCommentService.deleteComment(-1L, 1L, member))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("해당 게시글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("존재하지 않는 댓글이라면 예외를 던진다.")
        void emptyComment() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());
            Post post = postRepository.save(
                    Post.builder()
                            .writer(member)
                            .postBody(PostBody.builder().title("title").content("content").build())
                            .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                            .build()
            );

            // when, then
            assertThatThrownBy(() -> postCommentService.deleteComment(post.getId(), -1L, member))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("해당 댓글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("댓글의 게시글과 일치하지 않으면 예외를 던진다.")
        void invalidBelongPost() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());
            Post postA = postRepository.save(
                    Post.builder()
                            .writer(member)
                            .postBody(PostBody.builder().title("titleA").content("contentA").build())
                            .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                            .build()
            );
            Post postB = postRepository.save(
                    Post.builder()
                            .writer(member)
                            .postBody(PostBody.builder().title("titleB").content("contentB").build())
                            .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                            .build()
            );
            Comment comment = commentRepository.save(
                    Comment.builder()
                            .member(member)
                            .post(postA)
                            .content("comment")
                            .build()
            );

            // when, then
            assertThatThrownBy(() -> postCommentService.deleteComment(postB.getId(), comment.getId(), member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("댓글의 게시글 정보와 일치하지 않습니다.");
        }

        @Test
        @DisplayName("댓글의 작성자가 아니라면 예외를 던진다.")
        void invalidWriter() {
            // given
            Member memberA = memberRepository.save(MemberFixtures.MALE_20.get());
            Member memberB = memberRepository.save(MemberFixtures.FEMALE_20.get());
            Post post = postRepository.save(
                    Post.builder()
                            .writer(memberA)
                            .postBody(PostBody.builder().title("titleA").content("contentA").build())
                            .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                            .build()
            );
            Comment comment = commentRepository.save(
                    Comment.builder()
                            .member(memberB)
                            .post(post)
                            .content("comment")
                            .build()
            );

            // when, then
            assertThatThrownBy(() -> postCommentService.deleteComment(post.getId(), comment.getId(), memberA))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("댓글 작성자가 아닙니다.");
        }

        @Test
        @DisplayName("게시글의 댓글을 삭제한다.")
        void deleteComment() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());
            Post post = postRepository.save(
                    Post.builder()
                            .writer(member)
                            .postBody(PostBody.builder().title("titleA").content("contentA").build())
                            .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                            .build()
            );
            Comment comment = commentRepository.save(
                    Comment.builder()
                            .member(member)
                            .post(post)
                            .content("comment")
                            .build()
            );

            // when
            postCommentService.deleteComment(post.getId(), comment.getId(), member);

            // then
            assertThat(commentRepository.findAll()).isEmpty();
        }

    }

}
