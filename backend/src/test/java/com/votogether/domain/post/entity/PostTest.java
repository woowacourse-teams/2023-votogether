package com.votogether.domain.post.entity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.votogether.domain.member.entity.Member;
import com.votogether.test.fixtures.MemberFixtures;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

class PostTest {

    @Test
    @DisplayName("게시글 옵션을 삭제한다.")
    void removePostOption() {
        // given
        Post post = Post.builder()
                .title("hello")
                .content("world")
                .deadline(LocalDateTime.now())
                .build();
        PostOption postOption = PostOption.builder()
                .content("hello")
                .imageUrl(null)
                .build();
        post.addPostOption(postOption);
        ReflectionTestUtils.setField(postOption, "id", 1L);

        // when
        post.removePostOption(postOption);

        // then
        assertThat(post.getPostOptions()).isEmpty();
    }

    @Test
    @DisplayName("게시글을 수정한다.")
    void update() {
        // given
        Post post = Post.builder()
                .title("hello")
                .content("world")
                .deadline(LocalDateTime.now())
                .build();
        String newTitle = "hello world";
        String newContent = "votogether";
        LocalDateTime newDeadline = LocalDateTime.now().plusDays(1);

        // when
        post.update(newTitle, newContent, newDeadline);

        // then
        assertSoftly(softly -> {
            softly.assertThat(post.getTitle()).isEqualTo(newTitle);
            softly.assertThat(post.getContent()).isEqualTo(newContent);
            softly.assertThat(post.getDeadline()).isEqualTo(newDeadline);
        });
    }

    @Nested
    @DisplayName("삭제 가능 여부 확인")
    class CanDelete {

        @Test
        @DisplayName("투표 수가 삭제 제한 개수보다 작으면 true 반환한다.")
        void canDelete() {
            // given
            Post post = Post.builder()
                    .title("hello")
                    .content("world")
                    .deadline(LocalDateTime.now())
                    .build();
            PostOption postOption = PostOption.builder()
                    .content("hello")
                    .imageUrl(null)
                    .build();
            ReflectionTestUtils.setField(postOption, "voteCount", 19);
            post.addPostOption(postOption);

            // when
            boolean result = post.canDelete();

            // then
            assertThat(result).isTrue();
        }

        @Test
        @DisplayName("투표 수가 삭제 제한 개수보다 많으면 false 반환한다.")
        void cannotDelete() {
            // given
            Post post = Post.builder()
                    .title("hello")
                    .content("world")
                    .deadline(LocalDateTime.now())
                    .build();
            PostOption postOption = PostOption.builder()
                    .content("hello")
                    .imageUrl(null)
                    .build();
            ReflectionTestUtils.setField(postOption, "voteCount", 20);
            post.addPostOption(postOption);

            // when
            boolean result = post.canDelete();

            // then
            assertThat(result).isFalse();
        }

    }

    @Nested
    @DisplayName("작성자 확인")
    class IsWriter {

        @Test
        @DisplayName("게시글 작성자라면 true 반환한다.")
        void isWriter() {
            // given
            Member member = MemberFixtures.MALE_20.get();
            Post post = Post.builder()
                    .writer(member)
                    .title("hello")
                    .content("world")
                    .deadline(LocalDateTime.now())
                    .build();
            ReflectionTestUtils.setField(member, "id", 1L);

            // when
            boolean result = post.isWriter(member);

            // then
            assertThat(result).isTrue();
        }

        @Test
        @DisplayName("게시글 작성자가 아니라면 false 반환한다.")
        void isNotWriter() {
            // given
            Member writer = MemberFixtures.MALE_20.get();
            Member member = MemberFixtures.MALE_30.get();
            Post post = Post.builder()
                    .writer(writer)
                    .title("hello")
                    .content("world")
                    .deadline(LocalDateTime.now())
                    .build();
            ReflectionTestUtils.setField(writer, "id", 1L);
            ReflectionTestUtils.setField(member, "id", 2L);

            // when
            boolean result = post.isWriter(member);

            // then
            assertThat(result).isFalse();
        }

    }

    @Nested
    @DisplayName("게시글 블라인드")
    class Blind {

        @Test
        @DisplayName("게시글 생성 시 블라인드 되어 있지 않다.")
        void initNotBlind() {
            // given
            Post post = Post.builder()
                    .title("hello")
                    .content("world")
                    .deadline(LocalDateTime.now())
                    .build();

            // when, then
            assertThat(post.isHidden()).isFalse();
        }

        @Test
        @DisplayName("게시글을 블라인드한다.")
        void blind() {
            // given
            Post post = Post.builder()
                    .title("hello")
                    .content("world")
                    .deadline(LocalDateTime.now())
                    .build();

            // when
            post.blind();

            // then
            assertThat(post.isHidden()).isTrue();
        }

    }

    @Nested
    @DisplayName("게시글 첫번째 이미지 조회")
    class GetFirstImage {

        @Test
        @DisplayName("게시글 이미지가 존재하지 않으면 null 반환한다.")
        void returnNull() {
            // given
            Post post = Post.builder()
                    .title("hello")
                    .content("world")
                    .deadline(LocalDateTime.now())
                    .build();

            // when
            PostContentImage result = post.getFirstContentImage();

            // then
            assertThat(result).isNull();
        }

        @Test
        @DisplayName("게시글 이미지가 존재하면 첫번째 이미지를 반환한다.")
        void returnFirstImage() {
            // given
            Post post = Post.builder()
                    .title("hello")
                    .content("world")
                    .deadline(LocalDateTime.now())
                    .build();
            post.addContentImage("image.png");

            // when
            PostContentImage result = post.getFirstContentImage();

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).isNotNull();
                softly.assertThat(result.getImageUrl()).isEqualTo("image.png");
            });
        }

    }

}
