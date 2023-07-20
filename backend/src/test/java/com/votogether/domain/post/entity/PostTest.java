package com.votogether.domain.post.entity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.member.entity.Member;
import com.votogether.fixtures.MemberFixtures;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

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
    @DisplayName("게시글의 작성자 여부를 확인한다.")
    void isWriter() {
        // given
        Member memberA = MemberFixtures.MALE_20.get();
        Member memberB = MemberFixtures.FEMALE_20.get();

        ReflectionTestUtils.setField(memberA, "id", 1L);
        ReflectionTestUtils.setField(memberB, "id", 2L);

        Post post = Post.builder()
                .member(memberA)
                .build();

        // when
        boolean result1 = post.isWriter(memberA);
        boolean result2 = post.isWriter(memberB);

        // then
        assertAll(
                () -> assertThat(result1).isTrue(),
                () -> assertThat(result2).isFalse()
        );
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

}
