package com.votogether.domain.post.entity;

import static com.votogether.fixtures.MemberFixtures.MALE_30;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatNoException;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.exception.BadRequestException;
import com.votogether.fixtures.MemberFixtures;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
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
    @DisplayName("PostOption의 내용을 전달하면 Post와 PostOption이 매핑된다")
    void mapPostOptionsByElements() {
        // given
        Post post = Post.builder().build();

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
        post.mapPostOptionsByElements(List.of("content1", "content2"), List.of(file1, file2));

        // then
        List<PostOption> postOptions = post.getPostOptions().getPostOptions();
        assertThat(postOptions).hasSize(2);
    }

    @Test
    @DisplayName("게시글 작성 시, 게시글의 마감 기한이 현재 시간보다 3일 초과 여부에 따라 예외를 던질 지 결정한다.")
    void throwExceptionIsWriter() {
        // given
        final Member writer = MemberFixtures.MALE_30.get();
        ReflectionTestUtils.setField(writer, "id", 1L);

        Post post1 = Post.builder()
                .writer(writer)
                .deadline(LocalDateTime.now().plusDays(4))
                .build();

        Post post2 = Post.builder()
                .writer(writer)
                .deadline(LocalDateTime.now().plusDays(2))
                .build();

        // when, then
        assertAll(
                () -> assertThatThrownBy(post1::validateDeadlineNotExceedThreeDays)
                        .isInstanceOf(BadRequestException.class)
                        .hasMessage(PostExceptionType.DEADLINE_EXCEED_THREE_DAYS.getMessage()),
                () -> assertThatNoException()
                        .isThrownBy(post2::validateDeadlineNotExceedThreeDays)
        );
    }

    @Test
    @DisplayName("게시글의 작성자 여부를 확인한다.")
    void isWriter() {
        // given
        Post post = Post.builder()
                .writer(MALE_30.get())
                .build();

        // when
        boolean result1 = post.isWriter(MALE_30.get());

        // then
        assertThat(result1).isTrue();
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
