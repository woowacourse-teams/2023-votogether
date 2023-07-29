package com.votogether.domain.post.entity.comment;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.exception.BadRequestException;
import com.votogether.fixtures.MemberFixtures;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

class CommentTest {

    @Test
    @DisplayName("댓글 내용이 최대 글자를 초과하면 예외를 던진다.")
    void invalidContentLength() {
        // given
        String content = "a".repeat(501);
        PostBody body = PostBody.builder()
                .title("title")
                .content("content")
                .build();
        Post post = Post.builder()
                .writer(MemberFixtures.FEMALE_20.get())
                .postBody(body)
                .deadline(LocalDateTime.now())
                .build();

        // when, then
        assertThatThrownBy(
                () -> Comment.builder()
                        .member(MemberFixtures.MALE_20.get())
                        .post(post)
                        .content(content)
                        .build()
        )
                .isInstanceOf(BadRequestException.class)
                .hasMessage("유효하지 않은 댓글 길이입니다.");
    }

    @Test
    @DisplayName("댓글 작성자가 아니라면 예외를 던진다.")
    void invalidWriter() {
        // given
        Member member = MemberFixtures.FEMALE_20.get();
        PostBody body = PostBody.builder()
                .title("title")
                .content("content")
                .build();
        Post post = Post.builder()
                .member(member)
                .postBody(body)
                .deadline(LocalDateTime.now())
                .build();
        Comment comment = Comment.builder()
                .member(member)
                .post(post)
                .content("content")
                .build();

        ReflectionTestUtils.setField(member, "id", 1L);

        // when, then
        assertThatThrownBy(() -> comment.validateWriter(MemberFixtures.MALE_20.get()))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("댓글 작성자가 아닙니다.");
    }

    @Test
    @DisplayName("작성되어 있는 게시글이 아니라면 예외를 던진다.")
    void invalidPost() {
        // given
        Member member = MemberFixtures.FEMALE_20.get();
        PostBody bodyA = PostBody.builder()
                .title("title")
                .content("content")
                .build();
        Post postA = Post.builder()
                .member(member)
                .postBody(bodyA)
                .deadline(LocalDateTime.now())
                .build();
        PostBody bodyB = PostBody.builder()
                .title("title")
                .content("content")
                .build();
        Post postB = Post.builder()
                .member(member)
                .postBody(bodyB)
                .deadline(LocalDateTime.now())
                .build();
        Comment comment = Comment.builder()
                .member(member)
                .post(postA)
                .content("content")
                .build();

        ReflectionTestUtils.setField(postA, "id", 1L);

        // when, then
        assertThatThrownBy(() -> comment.validateBelong(postB))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("댓글의 게시글 정보와 일치하지 않습니다.");
    }

}
