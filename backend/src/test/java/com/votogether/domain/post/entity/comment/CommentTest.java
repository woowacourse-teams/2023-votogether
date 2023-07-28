package com.votogether.domain.post.entity.comment;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.exception.BadRequestException;
import com.votogether.fixtures.MemberFixtures;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

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
                .member(MemberFixtures.FEMALE_20.get())
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

}
