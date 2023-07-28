package com.votogether.domain.post.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.ServiceTest;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.dto.request.CommentRegisterRequest;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.repository.CommentRepository;
import com.votogether.domain.post.repository.PostRepository;
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

}
