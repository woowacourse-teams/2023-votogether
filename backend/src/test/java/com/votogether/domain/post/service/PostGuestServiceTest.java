package com.votogether.domain.post.service;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.post.dto.response.post.PostResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import com.votogether.global.exception.NotFoundException;
import com.votogether.test.ServiceTest;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class PostGuestServiceTest extends ServiceTest {

    @Autowired
    PostGuestService postGuestService;

    @Nested
    @DisplayName("비회원 게시글 목록 조회")
    class GuestGetPosts {

        @Test
        @DisplayName("마감된 게시글은 결과를 확인할 수 있다.")
        void canCheckResultsClosedPosts() {
            // given
            LocalDateTime deadline = LocalDateTime.now().minusDays(1).truncatedTo(ChronoUnit.MINUTES);
            Post post = postTestPersister.postBuilder().deadline(deadline).save();
            Category category = categoryTestPersister.builder().save();
            postTestPersister.postCategoryBuilder().post(post).category(category).save();
            PostOption postOptionA = postTestPersister.postOptionBuilder()
                    .sequence(2)
                    .content("postOptionA")
                    .save();
            PostOption postOptionB = postTestPersister.postOptionBuilder()
                    .sequence(1)
                    .content("postOptionB")
                    .imageUrl("https:://votogether.com/static/images/image.png")
                    .save();
            post.addPostOption(postOptionA);
            post.addPostOption(postOptionB);

            // when
            List<PostResponse> response =
                    postGuestService.getPosts(0, PostClosingType.ALL, PostSortType.LATEST, category.getId());

            // then
            assertSoftly(softly -> {
                softly.assertThat(response).hasSize(1);
                softly.assertThat(response.get(0).postId()).isEqualTo(post.getId());
                softly.assertThat(response.get(0).imageUrl()).isEqualTo("");
                softly.assertThat(response.get(0).categories()).hasSize(1);
                softly.assertThat(response.get(0).createdAt()).isEqualTo(post.getCreatedAt());
                softly.assertThat(response.get(0).deadline()).isEqualTo(post.getDeadline());
                softly.assertThat(response.get(0).imageCount()).isEqualTo(1);
                softly.assertThat(response.get(0).voteInfo().selectedOptionId()).isEqualTo(0);
                softly.assertThat(response.get(0).voteInfo().totalVoteCount()).isEqualTo(0);
                softly.assertThat(response.get(0).voteInfo().options()).hasSize(2);
                softly.assertThat(response.get(0).voteInfo().options().get(0).optionId())
                        .isEqualTo(postOptionB.getId());
                softly.assertThat(response.get(0).voteInfo().options().get(0).imageUrl())
                        .isEqualTo("https:://votogether.com/static/images/image.png");
                softly.assertThat(response.get(0).voteInfo().options().get(0).voteCount()).isEqualTo(0);
                softly.assertThat(response.get(0).voteInfo().options().get(0).votePercent()).isEqualTo(0);
                softly.assertThat(response.get(0).voteInfo().options().get(1).optionId())
                        .isEqualTo(postOptionA.getId());
                softly.assertThat(response.get(0).voteInfo().options().get(1).imageUrl()).isEqualTo("");
                softly.assertThat(response.get(0).voteInfo().options().get(1).voteCount()).isEqualTo(0);
                softly.assertThat(response.get(0).voteInfo().options().get(1).votePercent()).isEqualTo(0);
            });
        }

        @Test
        @DisplayName("진행중인 게시글은 결과를 확인할 수 없다.")
        void cannotCheckResultsOpenPosts() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(1).truncatedTo(ChronoUnit.MINUTES);
            Post post = postTestPersister.postBuilder().deadline(deadline).save();
            Category category = categoryTestPersister.builder().save();
            postTestPersister.postCategoryBuilder().post(post).category(category).save();
            PostOption postOptionA = postTestPersister.postOptionBuilder()
                    .sequence(2)
                    .content("postOptionA")
                    .save();
            PostOption postOptionB = postTestPersister.postOptionBuilder()
                    .sequence(1)
                    .content("postOptionB")
                    .imageUrl("https:://votogether.com/static/images/image.png")
                    .save();
            post.addPostOption(postOptionA);
            post.addPostOption(postOptionB);

            // when
            List<PostResponse> response =
                    postGuestService.getPosts(0, PostClosingType.ALL, PostSortType.LATEST, category.getId());

            // then
            assertSoftly(softly -> {
                softly.assertThat(response).hasSize(1);
                softly.assertThat(response.get(0).postId()).isEqualTo(post.getId());
                softly.assertThat(response.get(0).imageUrl()).isEqualTo("");
                softly.assertThat(response.get(0).categories()).hasSize(1);
                softly.assertThat(response.get(0).createdAt()).isEqualTo(post.getCreatedAt());
                softly.assertThat(response.get(0).deadline()).isEqualTo(post.getDeadline());
                softly.assertThat(response.get(0).imageCount()).isEqualTo(1);
                softly.assertThat(response.get(0).voteInfo().selectedOptionId()).isEqualTo(0);
                softly.assertThat(response.get(0).voteInfo().totalVoteCount()).isEqualTo(-1);
                softly.assertThat(response.get(0).voteInfo().options()).hasSize(2);
                softly.assertThat(response.get(0).voteInfo().options().get(0).optionId())
                        .isEqualTo(postOptionB.getId());
                softly.assertThat(response.get(0).voteInfo().options().get(0).imageUrl())
                        .isEqualTo("https:://votogether.com/static/images/image.png");
                softly.assertThat(response.get(0).voteInfo().options().get(0).voteCount()).isEqualTo(-1);
                softly.assertThat(response.get(0).voteInfo().options().get(0).votePercent()).isEqualTo(0);
                softly.assertThat(response.get(0).voteInfo().options().get(1).optionId())
                        .isEqualTo(postOptionA.getId());
                softly.assertThat(response.get(0).voteInfo().options().get(1).imageUrl()).isEqualTo("");
                softly.assertThat(response.get(0).voteInfo().options().get(1).voteCount()).isEqualTo(-1);
                softly.assertThat(response.get(0).voteInfo().options().get(1).votePercent()).isEqualTo(0);
            });
        }

    }

    @Nested
    @DisplayName("비회원 게시글 상세 조회")
    class GuestGetPost {

        @Test
        @DisplayName("마감된 게시글은 결과를 확인할 수 있다.")
        void canCheckResultsClosedPost() {
            // given
            LocalDateTime deadline = LocalDateTime.now().minusDays(1).truncatedTo(ChronoUnit.MINUTES);
            Post post = postTestPersister.postBuilder().deadline(deadline).save();
            Category category = categoryTestPersister.builder().save();
            postTestPersister.postCategoryBuilder().post(post).category(category).save();
            PostOption postOptionA = postTestPersister.postOptionBuilder()
                    .sequence(2)
                    .content("postOptionA")
                    .save();
            PostOption postOptionB = postTestPersister.postOptionBuilder()
                    .sequence(1)
                    .content("postOptionB")
                    .imageUrl("https:://votogether.com/static/images/image.png")
                    .save();
            post.addPostOption(postOptionA);
            post.addPostOption(postOptionB);

            // when
            PostResponse response = postGuestService.getPost(post.getId());

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.postId()).isEqualTo(post.getId());
                softly.assertThat(response.imageUrl()).isEqualTo("");
                softly.assertThat(response.categories()).hasSize(1);
                softly.assertThat(response.createdAt()).isEqualTo(post.getCreatedAt());
                softly.assertThat(response.deadline()).isEqualTo(post.getDeadline());
                softly.assertThat(response.imageCount()).isEqualTo(1);
                softly.assertThat(response.voteInfo().selectedOptionId()).isEqualTo(0);
                softly.assertThat(response.voteInfo().totalVoteCount()).isEqualTo(0);
                softly.assertThat(response.voteInfo().options()).hasSize(2);
                softly.assertThat(response.voteInfo().options().get(0).optionId()).isEqualTo(postOptionB.getId());
                softly.assertThat(response.voteInfo().options().get(0).imageUrl())
                        .isEqualTo("https:://votogether.com/static/images/image.png");
                softly.assertThat(response.voteInfo().options().get(0).voteCount()).isEqualTo(0);
                softly.assertThat(response.voteInfo().options().get(0).votePercent()).isEqualTo(0);
                softly.assertThat(response.voteInfo().options().get(1).optionId()).isEqualTo(postOptionA.getId());
                softly.assertThat(response.voteInfo().options().get(1).imageUrl()).isEqualTo("");
                softly.assertThat(response.voteInfo().options().get(1).voteCount()).isEqualTo(0);
                softly.assertThat(response.voteInfo().options().get(1).votePercent()).isEqualTo(0);
            });
        }

        @Test
        @DisplayName("진행중인 게시글은 결과를 확인할 수 없다.")
        void cannotCheckResultsOpenPosts() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(1).truncatedTo(ChronoUnit.MINUTES);
            Post post = postTestPersister.postBuilder().deadline(deadline).save();
            Category category = categoryTestPersister.builder().save();
            postTestPersister.postCategoryBuilder().post(post).category(category).save();
            PostOption postOptionA = postTestPersister.postOptionBuilder()
                    .sequence(2)
                    .content("postOptionA")
                    .save();
            PostOption postOptionB = postTestPersister.postOptionBuilder()
                    .sequence(1)
                    .content("postOptionB")
                    .imageUrl("https:://votogether.com/static/images/image.png")
                    .save();
            post.addPostOption(postOptionA);
            post.addPostOption(postOptionB);

            // when
            PostResponse response = postGuestService.getPost(post.getId());

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.postId()).isEqualTo(post.getId());
                softly.assertThat(response.imageUrl()).isEqualTo("");
                softly.assertThat(response.categories()).hasSize(1);
                softly.assertThat(response.createdAt()).isEqualTo(post.getCreatedAt());
                softly.assertThat(response.deadline()).isEqualTo(post.getDeadline());
                softly.assertThat(response.imageCount()).isEqualTo(1);
                softly.assertThat(response.voteInfo().selectedOptionId()).isEqualTo(0);
                softly.assertThat(response.voteInfo().totalVoteCount()).isEqualTo(-1);
                softly.assertThat(response.voteInfo().options()).hasSize(2);
                softly.assertThat(response.voteInfo().options().get(0).optionId()).isEqualTo(postOptionB.getId());
                softly.assertThat(response.voteInfo().options().get(0).imageUrl())
                        .isEqualTo("https:://votogether.com/static/images/image.png");
                softly.assertThat(response.voteInfo().options().get(0).voteCount()).isEqualTo(-1);
                softly.assertThat(response.voteInfo().options().get(0).votePercent()).isEqualTo(0);
                softly.assertThat(response.voteInfo().options().get(1).optionId()).isEqualTo(postOptionA.getId());
                softly.assertThat(response.voteInfo().options().get(1).imageUrl()).isEqualTo("");
                softly.assertThat(response.voteInfo().options().get(1).voteCount()).isEqualTo(-1);
                softly.assertThat(response.voteInfo().options().get(1).votePercent()).isEqualTo(0);
            });
        }

        @Test
        @DisplayName("존재하지 않는 게시글이라면 예외를 던진다.")
        void throwExceptionNotFoundPost() {
            // given
            Long postId = -1L;

            // when, then
            assertThatThrownBy(() -> postGuestService.getPost(postId))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("게시글이 존재하지 않습니다.");
        }

    }

    @Nested
    @DisplayName("비회원 게시글 목록 검색")
    class GuestSearchPosts {

        @Test
        @DisplayName("마감된 게시글은 결과를 확인할 수 있다.")
        void canCheckResultsClosedPosts() {
            // given
            LocalDateTime deadline = LocalDateTime.now().minusDays(1).truncatedTo(ChronoUnit.MINUTES);
            Post post = postTestPersister.postBuilder().title("votogether").deadline(deadline).save();
            Category category = categoryTestPersister.builder().save();
            postTestPersister.postCategoryBuilder().post(post).category(category).save();
            PostOption postOptionA = postTestPersister.postOptionBuilder()
                    .sequence(2)
                    .content("postOptionA")
                    .save();
            PostOption postOptionB = postTestPersister.postOptionBuilder()
                    .sequence(1)
                    .content("postOptionB")
                    .imageUrl("https:://votogether.com/static/images/image.png")
                    .save();
            post.addPostOption(postOptionA);
            post.addPostOption(postOptionB);

            // when
            List<PostResponse> response =
                    postGuestService.searchPosts("votogether", 0, PostClosingType.ALL, PostSortType.LATEST);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response).hasSize(1);
                softly.assertThat(response.get(0).postId()).isEqualTo(post.getId());
                softly.assertThat(response.get(0).imageUrl()).isEqualTo("");
                softly.assertThat(response.get(0).categories()).hasSize(1);
                softly.assertThat(response.get(0).createdAt()).isEqualTo(post.getCreatedAt());
                softly.assertThat(response.get(0).deadline()).isEqualTo(post.getDeadline());
                softly.assertThat(response.get(0).imageCount()).isEqualTo(1);
                softly.assertThat(response.get(0).voteInfo().selectedOptionId()).isEqualTo(0);
                softly.assertThat(response.get(0).voteInfo().totalVoteCount()).isEqualTo(0);
                softly.assertThat(response.get(0).voteInfo().options()).hasSize(2);
                softly.assertThat(response.get(0).voteInfo().options().get(0).optionId())
                        .isEqualTo(postOptionB.getId());
                softly.assertThat(response.get(0).voteInfo().options().get(0).imageUrl())
                        .isEqualTo("https:://votogether.com/static/images/image.png");
                softly.assertThat(response.get(0).voteInfo().options().get(0).voteCount()).isEqualTo(0);
                softly.assertThat(response.get(0).voteInfo().options().get(0).votePercent()).isEqualTo(0);
                softly.assertThat(response.get(0).voteInfo().options().get(1).optionId())
                        .isEqualTo(postOptionA.getId());
                softly.assertThat(response.get(0).voteInfo().options().get(1).imageUrl()).isEqualTo("");
                softly.assertThat(response.get(0).voteInfo().options().get(1).voteCount()).isEqualTo(0);
                softly.assertThat(response.get(0).voteInfo().options().get(1).votePercent()).isEqualTo(0);
            });
        }

        @Test
        @DisplayName("진행중인 게시글은 결과를 확인할 수 없다.")
        void cannotCheckResultsOpenPosts() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(1).truncatedTo(ChronoUnit.MINUTES);
            Post post = postTestPersister.postBuilder().title("votogether").deadline(deadline).save();
            Category category = categoryTestPersister.builder().save();
            postTestPersister.postCategoryBuilder().post(post).category(category).save();
            PostOption postOptionA = postTestPersister.postOptionBuilder()
                    .sequence(2)
                    .content("postOptionA")
                    .save();
            PostOption postOptionB = postTestPersister.postOptionBuilder()
                    .sequence(1)
                    .content("postOptionB")
                    .imageUrl("https:://votogether.com/static/images/image.png")
                    .save();
            post.addPostOption(postOptionA);
            post.addPostOption(postOptionB);

            // when
            List<PostResponse> response =
                    postGuestService.searchPosts("votogether", 0, PostClosingType.ALL, PostSortType.LATEST);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response).hasSize(1);
                softly.assertThat(response.get(0).postId()).isEqualTo(post.getId());
                softly.assertThat(response.get(0).imageUrl()).isEqualTo("");
                softly.assertThat(response.get(0).categories()).hasSize(1);
                softly.assertThat(response.get(0).createdAt()).isEqualTo(post.getCreatedAt());
                softly.assertThat(response.get(0).deadline()).isEqualTo(post.getDeadline());
                softly.assertThat(response.get(0).imageCount()).isEqualTo(1);
                softly.assertThat(response.get(0).voteInfo().selectedOptionId()).isEqualTo(0);
                softly.assertThat(response.get(0).voteInfo().totalVoteCount()).isEqualTo(-1);
                softly.assertThat(response.get(0).voteInfo().options()).hasSize(2);
                softly.assertThat(response.get(0).voteInfo().options().get(0).optionId())
                        .isEqualTo(postOptionB.getId());
                softly.assertThat(response.get(0).voteInfo().options().get(0).imageUrl())
                        .isEqualTo("https:://votogether.com/static/images/image.png");
                softly.assertThat(response.get(0).voteInfo().options().get(0).voteCount()).isEqualTo(-1);
                softly.assertThat(response.get(0).voteInfo().options().get(0).votePercent()).isEqualTo(0);
                softly.assertThat(response.get(0).voteInfo().options().get(1).optionId())
                        .isEqualTo(postOptionA.getId());
                softly.assertThat(response.get(0).voteInfo().options().get(1).imageUrl()).isEqualTo("");
                softly.assertThat(response.get(0).voteInfo().options().get(1).voteCount()).isEqualTo(-1);
                softly.assertThat(response.get(0).voteInfo().options().get(1).votePercent()).isEqualTo(0);
            });
        }

    }

}
