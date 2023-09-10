package com.votogether.domain.post.entity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

class PostOptionTest {

    @Test
    @DisplayName("게시글 옵션을 수정한다.")
    void update() {
        // given
        PostOption postOption = PostOption.builder()
                .content("hello")
                .imageUrl(null)
                .build();
        String newContent = "votogether";
        String newImageUrl = "image.png";

        // when
        postOption.update(newContent, newImageUrl);

        // then
        assertSoftly(softly -> {
            softly.assertThat(postOption.getContent()).isEqualTo(newContent);
            softly.assertThat(postOption.getImageUrl()).isEqualTo(newImageUrl);
        });
    }

    @Nested
    @DisplayName("속한 게시글 확인")
    class BelongsToPost {

        @Test
        @DisplayName("게시글에 속해있으면 true 반환한다.")
        void belongsTo() {
            // given
            Post post = Post.builder()
                    .title("hello")
                    .content("world")
                    .deadline(LocalDateTime.now())
                    .build();
            PostOption postOption = PostOption.builder()
                    .post(post)
                    .content("hello")
                    .imageUrl(null)
                    .build();
            ReflectionTestUtils.setField(post, "id", 1L);

            // when
            boolean result = postOption.belongsTo(post);

            // then
            assertThat(result).isTrue();
        }

        @Test
        @DisplayName("게시글에 속해있지 않으면 false 반환한다")
        void notBelongsTo() {
            // given
            Post postA = Post.builder()
                    .title("hello")
                    .content("world")
                    .deadline(LocalDateTime.now())
                    .build();
            Post postB = Post.builder()
                    .title("hello")
                    .content("world")
                    .deadline(LocalDateTime.now())
                    .build();
            PostOption postOption = PostOption.builder()
                    .post(postB)
                    .content("hello")
                    .imageUrl(null)
                    .build();
            ReflectionTestUtils.setField(postA, "id", 1L);
            ReflectionTestUtils.setField(postB, "id", 2L);

            // when
            boolean result = postOption.belongsTo(postA);

            // then
            assertThat(result).isFalse();
        }

    }

}
