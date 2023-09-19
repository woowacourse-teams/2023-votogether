package com.votogether.domain.post.entity.comment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.global.exception.BadRequestException;
import com.votogether.test.fixtures.MemberFixtures;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

class CommentTest {

    private Post generatePost() {
        return Post.builder()
                .writer(MemberFixtures.FEMALE_20.get())
                .title("title")
                .content("content")
                .deadline(LocalDateTime.now())
                .build();
    }

    @Test
    @DisplayName("댓글 내용이 최대 글자를 초과하면 예외를 던진다.")
    void invalidContentLength() {
        // given
        String content = "a".repeat(501);
        Post post = generatePost();

        // when, then
        assertThatThrownBy(
                () -> Comment.builder()
                        .writer(MemberFixtures.MALE_20.get())
                        .post(post)
                        .content(content)
                        .build()
        )
                .isInstanceOf(BadRequestException.class)
                .hasMessage("유효하지 않은 댓글 길이입니다.");
    }

    @Nested
    @DisplayName("게시글 댓글 확인")
    class PostBelongCheck {

        @Test
        @DisplayName("게시글의 댓글이라면 true 반환한다.")
        void belongsToPost() {
            // given
            Post post = generatePost();
            Comment comment = Comment.builder()
                    .writer(MemberFixtures.MALE_20.get())
                    .post(post)
                    .content("hello")
                    .build();

            // when, then
            assertThat(comment.belongsTo(post)).isTrue();
        }

        @Test
        @DisplayName("게시글의 댓글이 아니라면 false 반환한다.")
        void notBelongToPost() {
            // given
            Post post = generatePost();
            Post otherPost = generatePost();
            Comment comment = Comment.builder()
                    .writer(MemberFixtures.MALE_20.get())
                    .post(post)
                    .content("hello")
                    .build();
            ReflectionTestUtils.setField(post, "id", 1L);

            // when, then
            assertThat(comment.belongsTo(otherPost)).isFalse();
        }

    }

    @Nested
    @DisplayName("댓글 작성자 확인")
    class WriterCheck {

        @Test
        @DisplayName("작성자라면 true 반환한다.")
        void isWriter() {
            // given
            Member male20Member = MemberFixtures.MALE_20.get();
            Post post = generatePost();
            Comment comment = Comment.builder()
                    .writer(male20Member)
                    .post(post)
                    .content("hello")
                    .build();
            ReflectionTestUtils.setField(male20Member, "id", 1L);

            // when, then
            assertThat(comment.isWriter(male20Member)).isTrue();
        }

        @Test
        @DisplayName("작성자가 아니라면 false 반환한다.")
        void isNotWriter() {
            // given
            Member male20Member = MemberFixtures.MALE_20.get();
            Member female20Member = MemberFixtures.FEMALE_20.get();
            Post post = generatePost();
            Comment comment = Comment.builder()
                    .writer(male20Member)
                    .post(post)
                    .content("hello")
                    .build();
            ReflectionTestUtils.setField(male20Member, "id", 1L);

            // when, then
            assertThat(comment.isWriter(female20Member)).isFalse();
        }

    }

    @Nested
    @DisplayName("댓글 내용 수정")
    class UpdateContent {

        @Test
        @DisplayName("유효한 댓글이라면 댓글 내용이 수정된다.")
        void updateContent() {
            // given
            Post post = generatePost();
            Comment comment = Comment.builder()
                    .writer(MemberFixtures.MALE_20.get())
                    .post(post)
                    .content("hello")
                    .build();
            String newContent = "votogether";

            // when
            comment.updateContent(newContent);

            // then
            assertThat(comment.getContent()).isEqualTo("votogether");
        }

        @Test
        @DisplayName("유효하지 않은 댓글이라면 예외를 던진다.")
        void updateContentFail() {
            // given
            Post post = generatePost();
            Comment comment = Comment.builder()
                    .writer(MemberFixtures.MALE_20.get())
                    .post(post)
                    .content("hello")
                    .build();
            String newContent = "a".repeat(501);

            // when, then
            assertThatThrownBy(() -> comment.updateContent(newContent))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("유효하지 않은 댓글 길이입니다.");
        }

    }

    @Test
    @DisplayName("댓글을 숨긴다.")
    void blind() {
        // given
        Post post = generatePost();
        Comment comment = Comment.builder()
                .writer(MemberFixtures.MALE_20.get())
                .post(post)
                .content("hello")
                .build();

        // when
        comment.blind();

        // then
        assertThat(comment.isHidden()).isTrue();
    }

}
