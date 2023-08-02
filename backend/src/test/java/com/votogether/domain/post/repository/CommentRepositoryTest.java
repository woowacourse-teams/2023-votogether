package com.votogether.domain.post.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.RepositoryTest;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.fixtures.MemberFixtures;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@RepositoryTest
class CommentRepositoryTest {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PostRepository postRepository;

    @Test
    @DisplayName("게시글의 댓글 목록을 조회한다.")
    void findAllByPost() {
        // given
        Member member = memberRepository.save(MemberFixtures.MALE_20.get());
        Post post = postRepository.save(
                Post.builder()
                        .writer(member)
                        .postBody(PostBody.builder().title("titleA").content("contentA").build())
                        .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                        .build()
        );
        Comment commentA = commentRepository.save(
                Comment.builder()
                        .member(member)
                        .post(post)
                        .content("commentA")
                        .build()
        );
        Comment commentB = commentRepository.save(
                Comment.builder()
                        .member(member)
                        .post(post)
                        .content("commentB")
                        .build()
        );

        // when
        List<Comment> result = commentRepository.findAllByPostOrderByCreatedAtAsc(post);

        // then
        assertThat(result).containsExactly(commentA, commentB);
    }

}