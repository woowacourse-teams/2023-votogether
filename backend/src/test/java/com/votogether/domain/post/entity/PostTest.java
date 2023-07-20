package com.votogether.domain.post.entity;

import static com.votogether.fixtures.CategoryFixtures.DEVELOP;
import static com.votogether.fixtures.CategoryFixtures.FOOD;
import static com.votogether.fixtures.MemberFixtures.FEMALE_20;
import static com.votogether.fixtures.MemberFixtures.MALE_30;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.domain.category.entity.Category;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class PostTest {

    @Test
    @DisplayName("여러 Category를 전달하면 Post와 매핑되어 PostOptions를 생성한다")
    void mapCategories() {
        // given
        final Post post = Post.builder().build();

        final List<Category> categories = List.of(FOOD, DEVELOP);

        // when
        post.mapCategories(categories);

        // then
        final PostCategories actualPostCategories = post.getPostCategories();
        assertThat(actualPostCategories.getPostCategories()).hasSize(2);
    }

    @Test
    @DisplayName("PostOption의 내용을 전달하면 Post와 PostOption이 매핑된다")
    void mapPostOptionsByElements() {
        // given
        final Post post = Post.builder().build();

        byte[] content = "Hello, World!".getBytes(StandardCharsets.UTF_8);
        MockMultipartFile file1 = new MockMultipartFile(
                "file1",
                "hello1.txt",
                MediaType.TEXT_PLAIN_VALUE,
                content
        );

        MockMultipartFile file2 = new MockMultipartFile(
                "file2",
                "hello2.txt",
                MediaType.TEXT_PLAIN_VALUE,
                content
        );

        // when
        post.mapPostOptionsByElements(List.of("content1", "content2"), post, List.of(file1, file2));

        // then
        final List<PostOption> postOptions = post.getPostOptions().getPostOptions();
        assertThat(postOptions).hasSize(2);
    }

    @Test
    @DisplayName("게시글의 작성자 여부를 확인한다.")
    void isWriter() {
        // given
        Post post = Post.builder()
                .member(MALE_30)
                .build();

        // when
        boolean result1 = post.isWriter(MALE_30);
        boolean result2 = post.isWriter(FEMALE_20);

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
        Post post1 = Post.builder()
                .deadline(
                        LocalDateTime.of(2022, 1, 1, 0, 0))
                .build();

        Post post2 = Post.builder()
                .deadline(
                        LocalDateTime.of(3222, 1, 1, 0, 0))
                .build();

        // when
        boolean result1 = post1.isClosed();
        boolean result2 = post2.isClosed();

        // then
        assertAll(
                () -> assertThat(result1).isTrue(),
                () -> assertThat(result2).isFalse()
        );
    }

}
