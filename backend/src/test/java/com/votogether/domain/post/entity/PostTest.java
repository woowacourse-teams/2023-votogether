package com.votogether.domain.post.entity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.fixtures.CategoryFixtures;
import com.votogether.fixtures.MemberFixtures;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.mock.web.MockMultipartFile;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class PostTest {

    @Test
    @DisplayName("여러 Category를 전달하면 Post와 매핑되어 PostOptions를 생성한다")
    void mapCategories() {
        // given
        final Post post = Post.builder().build();
        final Category category1 = Category.builder().build();
        final Category category2 = Category.builder().build();

        final List<Category> categories = List.of(category1, category2);

        // when
        post.mapCategories(categories);

        // then
        final PostCategories actualPostCategories = post.getPostCategories();
        assertThat(actualPostCategories.getPostCategories()).hasSize(2);
    }

    @Test
    @DisplayName("게시글을 수정한다")
    void update() throws IOException {
        // given
        Member writer = MemberFixtures.MALE_20;
        final Post post = Post.builder()
                .member(writer)
                .postBody(PostBody.builder().title("title").content("content").build())
                .deadline(LocalDateTime.of(2100, 7, 12, 0, 0))
                .build();

        MockMultipartFile file1 = new MockMultipartFile(
                "image1",
                "test.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage1.PNG")
        );

        MockMultipartFile file2 = new MockMultipartFile(
                "image1",
                "test.png",
                "image/png",
                new FileInputStream("src/test/resources/images/testImage2.PNG")
        );

        // when
        post.update(
                List.of(CategoryFixtures.DEVELOP),
                "title2",
                "content2",
                List.of("option1", "option2"),
                LocalDateTime.of(1900, 7, 12, 0, 0),
                List.of(file1, file2)
        );

        // then
        final PostBody postBody = post.getPostBody();
        assertAll(
                () -> assertThat(post.getPostCategories().getPostCategories()).hasSize(1),
                () -> assertThat(postBody.getTitle()).isEqualTo("title2"),
                () -> assertThat(postBody.getContent()).isEqualTo("content2"),
                () -> assertThat(post.getPostOptions().getPostOptions()).hasSize(2),
                () -> assertThat(post.getDeadline()).isBefore(LocalDateTime.now())
        );
    }

    @Test
    @DisplayName("게시글의 작성자 여부를 확인한다.")
    void isWriter() {
        // given
        Member member1 = Member.builder()
                .gender(Gender.MALE)
                .point(0)
                .socialType(SocialType.KAKAO)
                .nickname("user1")
                .socialId("kakao@gmail.com")
                .ageRange("30~39")
                .birthday("0101")
                .build();

        Member member2 = Member.builder()
                .nickname("s")
                .build();

        Post post = Post.builder()
                .member(member1)
                .build();

        // when
        boolean result1 = post.isWriter(member1);
        boolean result2 = post.isWriter(member2);

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
