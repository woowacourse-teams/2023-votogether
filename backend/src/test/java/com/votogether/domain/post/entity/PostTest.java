package com.votogether.domain.post.entity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatNoException;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.util.ImageUploader;
import com.votogether.exception.BadRequestException;
import com.votogether.fixtures.MemberFixtures;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Stream;
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

        final List<String> imageUrls = Stream.of(file1, file2)
                .map(ImageUploader::upload)
                .toList();

        // when
        post.mapPostOptionsByElements(List.of("content1", "content2"), imageUrls);

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
                () -> assertThatThrownBy(() -> post1.validateDeadlineNotExceedByMaximumDeadline(3))
                        .isInstanceOf(BadRequestException.class)
                        .hasMessage(PostExceptionType.DEADLINE_EXCEED_THREE_DAYS.getMessage()),
                () -> assertThatNoException()
                        .isThrownBy(() -> post2.validateDeadlineNotExceedByMaximumDeadline(3))
        );
    }

    @Test
    @DisplayName("게시글의 마감 여부에 따라 예외를 던질 지 결정한다.")
    void throwExceptionIsDeadlinePassed() {
        // given
        final Member writer = MemberFixtures.MALE_30.get();
        ReflectionTestUtils.setField(writer, "id", 1L);

        Post post1 = Post.builder()
                .writer(writer)
                .deadline(LocalDateTime.of(2000, 1, 1, 1, 1))
                .build();

        Post post2 = Post.builder()
                .writer(writer)
                .deadline(LocalDateTime.of(9999, 1, 1, 1, 1))
                .build();

        // when, then
        assertAll(
                () -> assertThatThrownBy(post1::validateDeadLine)
                        .isInstanceOf(BadRequestException.class)
                        .hasMessage(PostExceptionType.POST_CLOSED.getMessage()),
                () -> assertThatNoException()
                        .isThrownBy(post2::validateDeadLine)
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
        post.closeEarly();

        // then
        assertThat(post.getDeadline()).isBefore(deadline);
    }

    @Test
    @DisplayName("게시글을 수정한다.")
    void update() {
        // given
        final Member writer = MemberFixtures.MALE_30.get();
        final PostBody postBody1 = PostBody.builder()
                .title("title1")
                .content("content1")
                .build();
        final Post post = Post.builder()
                .writer(writer)
                .postBody(postBody1)
                .deadline(LocalDateTime.now().plusDays(3))
                .build();

        final PostBody postBody2 = PostBody.builder()
                .title("title2")
                .content("content2")
                .build();

        Category categoryA = Category.builder().name("category1").build();
        Category categoryB = Category.builder().name("category2").build();

        List<Category> categories = List.of(categoryA, categoryB);

        // when
        final LocalDateTime deadline = LocalDateTime.now().plusDays(2);
        post.update(
                postBody2,
                "oldContentUrl",
                List.of("newContentUrl"),
                categories,
                List.of("option1", "option2"),
                List.of("optionImage1", "optionImage2"),
                List.of("newOptionImage1", "newOptionImage2"),
                deadline
        );

        // then
        final PostBody postBody = post.getPostBody();
        final List<PostOption> postOptions = post.getPostOptions().getPostOptions();
        final List<PostCategory> postCategories = post.getPostCategories().getPostCategories();
        final LocalDateTime actualDeadline = post.getDeadline();
        assertAll(
                () -> assertThat(postBody.getTitle()).isEqualTo("title2"),
                () -> assertThat(postBody.getContent()).isEqualTo("content2"),
                () -> assertThat(postOptions.get(0).getContent()).isEqualTo("option1"),
                () -> assertThat(postOptions.get(0).getImageUrl()).isEqualTo("newOptionImage1"),
                () -> assertThat(postCategories.get(0).getCategory().getName()).isEqualTo("category1"),
                () -> assertThat(actualDeadline).hasYear(deadline.getYear()),
                () -> assertThat(actualDeadline).hasMonth(deadline.getMonth()),
                () -> assertThat(actualDeadline).hasDayOfMonth(deadline.getDayOfMonth())
        );
    }

}
