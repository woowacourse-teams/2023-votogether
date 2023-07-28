package com.votogether.domain.post.entity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.domain.category.entity.Category;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class PostTest {

    @Test
    @DisplayName("여러 Category를 전달하면 Post와 매핑되어 PostOptions를 생성한다")
    void mapCategories() {
        // given
        Post post = Post.builder().build();
        Category categoryA = Category.builder().build();
        Category categoryB = Category.builder().build();

        List<Category> categories = List.of(categoryA, categoryB);

        // when
        post.mapCategories(categories);

        // then
        PostCategories actualPostCategories = post.getPostCategories();
        assertThat(actualPostCategories.getPostCategories()).hasSize(2);
    }

    @Test
    @DisplayName("게시글의 마감 여부를 확인한다.")
    void isClosed() {
        // given
        Post postA = Post.builder()
                .deadline(LocalDateTime.of(2022, 1, 1, 0, 0))
                .build();

        Post postB = Post.builder()
                .deadline(LocalDateTime.of(3222, 1, 1, 0, 0))
                .build();

        // when
        boolean resultA = postA.isClosed();
        boolean resultB = postB.isClosed();

        // then
        assertAll(
                () -> assertThat(resultA).isTrue(),
                () -> assertThat(resultB).isFalse()
        );
    }

    @Test
    @DisplayName("해당 게시글을 조기 마감 합니다.")
    void closedEarly() {
        // given
        LocalDateTime deadline = LocalDateTime.of(2100, 1, 1, 0, 0);
        Post post = Post.builder()
                .deadline(deadline)
                .build();


        // when
        post.closedEarly();

        // then
        assertThat(post.getDeadline()).isBefore(deadline);
    }

}
