package com.votogether.domain.post.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.ServiceTest;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.dto.request.CommentRegisterRequest;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.repository.CommentRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.fixtures.MemberFixtures;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
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

    @Test
    @DisplayName("게시글에 댓글을 등록한다.")
    void createComment() {
        // given
        Member member = memberRepository.save(MemberFixtures.MALE_20.get());
        Post post = postRepository.save(
                Post.builder()
                        .member(member)
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
