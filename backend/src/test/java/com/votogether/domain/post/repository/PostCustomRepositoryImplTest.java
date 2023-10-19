package com.votogether.domain.post.repository;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import com.votogether.domain.post.repository.dto.PostCommentCountDto;
import com.votogether.test.RepositoryTest;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Set;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

class PostCustomRepositoryImplTest extends RepositoryTest {

    @Autowired
    PostCustomRepositoryImpl postCustomRepository;

    @Test
    @DisplayName("게시글 ID 목록에 속한 게시글의 댓글 수 조회")
    void getReviewCountsInPosts() {
        // given
        Post post = postTestPersister.postBuilder().save();
        commentTestPersister.builder().post(post).save();
        commentTestPersister.builder().post(post).save();

        // when
        List<PostCommentCountDto> result = postCustomRepository.getCommentCountsInPosts(Set.of(post.getId()));

        // then
        assertSoftly(softly -> {
            softly.assertThat(result).hasSize(1);
            softly.assertThat(result.get(0).postId()).isEqualTo(post.getId());
            softly.assertThat(result.get(0).commentCount()).isEqualTo(2);
        });
    }

    @Nested
    @DisplayName("마감시간, 정렬기준, 카테고리로 필터링하여 게시글 페이징 조회")
    class FindPostsWithFilteringAndPaging {

        @Test
        @DisplayName("마감되지 않은 게시글을 조회한다.")
        void getPostsOpen() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(1).truncatedTo(ChronoUnit.MINUTES);
            Post post = postTestPersister.postBuilder().deadline(deadline).save();

            // when
            Pageable pageable = PageRequest.of(0, 10);
            List<Post> result = postCustomRepository.findPostsWithFilteringAndPaging(
                    PostClosingType.PROGRESS,
                    PostSortType.LATEST,
                    null,
                    pageable
            );

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).hasSize(1);
                softly.assertThat(result).containsExactly(post);
            });
        }

        @Test
        @DisplayName("마감된 게시글을 조회한다.")
        void getPostsClosed() {
            // given
            LocalDateTime deadline = LocalDateTime.now().minusDays(1).truncatedTo(ChronoUnit.MINUTES);
            Post post = postTestPersister.postBuilder().deadline(deadline).save();

            // when
            Pageable pageable = PageRequest.of(0, 10);
            List<Post> result = postCustomRepository.findPostsWithFilteringAndPaging(
                    PostClosingType.CLOSED,
                    PostSortType.LATEST,
                    null,
                    pageable
            );

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).hasSize(1);
                softly.assertThat(result).containsExactly(post);
            });
        }

        @Test
        @DisplayName("게시글을 최신순으로 조회한다.")
        void getPostsByLatest() {
            // given
            Post postA = postTestPersister.postBuilder().save();
            Post postB = postTestPersister.postBuilder().save();

            // when
            Pageable pageable = PageRequest.of(0, 10);
            List<Post> result = postCustomRepository.findPostsWithFilteringAndPaging(
                    PostClosingType.ALL,
                    PostSortType.LATEST,
                    null,
                    pageable
            );

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).hasSize(2);
                softly.assertThat(result).containsExactly(postB, postA);
            });
        }

        @Test
        @DisplayName("게시글을 인기순으로 조회한다.")
        void getPostsByHot() {
            // post
            Post postA = postTestPersister.postBuilder().save();
            PostOption postOptionA = postTestPersister.postOptionBuilder().post(postA).sequence(1).save();
            voteTestPersister.builder().postOption(postOptionA).save();
            voteTestPersister.builder().postOption(postOptionA).save();
            Post postB = postTestPersister.postBuilder().save();
            PostOption postOptionB = postTestPersister.postOptionBuilder().post(postB).sequence(1).save();
            voteTestPersister.builder().postOption(postOptionB).save();

            // when
            Pageable pageable = PageRequest.of(0, 10);
            List<Post> result = postCustomRepository.findPostsWithFilteringAndPaging(
                    PostClosingType.ALL,
                    PostSortType.HOT,
                    null,
                    pageable
            );

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).hasSize(2);
                softly.assertThat(result).containsExactly(postA, postB);
            });
        }

        @Test
        @DisplayName("특정 카테고리의 게시글을 조회한다.")
        void getPostsTargetCategory() {
            // given
            Post post = postTestPersister.postBuilder().save();
            Category category = categoryTestPersister.builder().save();
            postTestPersister.postCategoryBuilder().post(post).category(category).save();

            // when
            Pageable pageable = PageRequest.of(0, 10);
            List<Post> result = postCustomRepository.findPostsWithFilteringAndPaging(
                    PostClosingType.ALL,
                    PostSortType.LATEST,
                    category.getId(),
                    pageable
            );

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).hasSize(1);
                softly.assertThat(result).containsExactly(post);
            });
        }

        @Test
        @DisplayName("카테고리 구분없이 게시글을 조회한다.")
        void getPostsAllCategory() {
            // given
            Post post = postTestPersister.postBuilder().save();
            Category category = categoryTestPersister.builder().save();
            postTestPersister.postCategoryBuilder().post(post).category(category).save();

            // when
            Pageable pageable = PageRequest.of(0, 10);
            List<Post> result = postCustomRepository.findPostsWithFilteringAndPaging(
                    PostClosingType.ALL,
                    PostSortType.LATEST,
                    null,
                    pageable
            );

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).hasSize(1);
                softly.assertThat(result).containsExactly(post);
            });
        }

    }

    @Nested
    @DisplayName("작성자, 마감시간, 정렬기준으로 필터링하여 게시글 페이징 조회")
    class FindPostsByWriterWithFilteringAndPaging {

        @Test
        @DisplayName("마감되지 않은 게시글을 조회한다.")
        void getPostsOpen() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(1).truncatedTo(ChronoUnit.MINUTES);
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).deadline(deadline).save();

            // when
            Pageable pageable = PageRequest.of(0, 10);
            List<Post> result = postCustomRepository.findPostsByWriterWithFilteringAndPaging(
                    member,
                    PostClosingType.PROGRESS,
                    PostSortType.LATEST,
                    pageable
            );

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).hasSize(1);
                softly.assertThat(result).containsExactly(post);
            });
        }

        @Test
        @DisplayName("마감된 게시글을 조회한다.")
        void getPostsClosed() {
            // given
            LocalDateTime deadline = LocalDateTime.now().minusDays(1).truncatedTo(ChronoUnit.MINUTES);
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).deadline(deadline).save();

            // when
            Pageable pageable = PageRequest.of(0, 10);
            List<Post> result = postCustomRepository.findPostsByWriterWithFilteringAndPaging(
                    member,
                    PostClosingType.CLOSED,
                    PostSortType.LATEST,
                    pageable
            );

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).hasSize(1);
                softly.assertThat(result).containsExactly(post);
            });
        }

        @Test
        @DisplayName("게시글을 최신순으로 조회한다.")
        void getPostsByLatest() {
            // given
            Member member = memberTestPersister.builder().save();
            Post postA = postTestPersister.postBuilder().writer(member).save();
            Post postB = postTestPersister.postBuilder().writer(member).save();

            // when
            Pageable pageable = PageRequest.of(0, 10);
            List<Post> result = postCustomRepository.findPostsByWriterWithFilteringAndPaging(
                    member,
                    PostClosingType.ALL,
                    PostSortType.LATEST,
                    pageable
            );

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).hasSize(2);
                softly.assertThat(result).containsExactly(postB, postA);
            });
        }

        @Test
        @DisplayName("게시글을 인기순으로 조회한다.")
        void getPostsByHot() {
            // post
            Member member = memberTestPersister.builder().save();
            Post postA = postTestPersister.postBuilder().writer(member).save();
            PostOption postOptionA = postTestPersister.postOptionBuilder().post(postA).sequence(1).save();
            voteTestPersister.builder().postOption(postOptionA).save();
            voteTestPersister.builder().postOption(postOptionA).save();
            Post postB = postTestPersister.postBuilder().writer(member).save();
            PostOption postOptionB = postTestPersister.postOptionBuilder().post(postB).sequence(1).save();
            voteTestPersister.builder().postOption(postOptionB).save();

            // when
            Pageable pageable = PageRequest.of(0, 10);
            List<Post> result = postCustomRepository.findPostsByWriterWithFilteringAndPaging(
                    member,
                    PostClosingType.ALL,
                    PostSortType.HOT,
                    pageable
            );

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).hasSize(2);
                softly.assertThat(result).containsExactly(postA, postB);
            });
        }

    }

    @Nested
    @DisplayName("키워드, 마감시간, 정렬기준으로 필터링하여 게시글 페이징 조회")
    class FindSearchPostsWithFilteringAndPaging {

        @Test
        @DisplayName("마감되지 않은 게시글을 조회한다.")
        void getPostsOpen() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(1).truncatedTo(ChronoUnit.MINUTES);
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder()
                    .writer(member)
                    .title("votogether")
                    .deadline(deadline)
                    .save();

            // when
            Pageable pageable = PageRequest.of(0, 10);
            List<Post> result = postCustomRepository.findSearchPostsWithFilteringAndPaging(
                    "votogether",
                    PostClosingType.PROGRESS,
                    PostSortType.LATEST,
                    pageable
            );

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).hasSize(1);
                softly.assertThat(result).containsExactly(post);
            });
        }

        @Test
        @DisplayName("마감된 게시글을 조회한다.")
        void getPostsClosed() {
            // given
            LocalDateTime deadline = LocalDateTime.now().minusDays(1).truncatedTo(ChronoUnit.MINUTES);
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder()
                    .writer(member)
                    .title("votogether")
                    .deadline(deadline).save();

            // when
            Pageable pageable = PageRequest.of(0, 10);
            List<Post> result = postCustomRepository.findSearchPostsWithFilteringAndPaging(
                    "votogether",
                    PostClosingType.CLOSED,
                    PostSortType.LATEST,
                    pageable
            );

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).hasSize(1);
                softly.assertThat(result).containsExactly(post);
            });
        }

        @Test
        @DisplayName("게시글을 최신순으로 조회한다.")
        void getPostsByLatest() {
            // given
            Member member = memberTestPersister.builder().save();
            Post postA = postTestPersister.postBuilder()
                    .writer(member)
                    .title("votogether1")
                    .save();
            Post postB = postTestPersister.postBuilder()
                    .writer(member)
                    .content("votogether2")
                    .save();

            // when
            Pageable pageable = PageRequest.of(0, 10);
            List<Post> result = postCustomRepository.findSearchPostsWithFilteringAndPaging(
                    "votogether",
                    PostClosingType.ALL,
                    PostSortType.LATEST,
                    pageable
            );

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).hasSize(2);
                softly.assertThat(result).containsExactly(postB, postA);
            });
        }

        @Test
        @DisplayName("게시글을 인기순으로 조회한다.")
        void getPostsByHot() {
            // post
            Member member = memberTestPersister.builder().save();
            Post postA = postTestPersister.postBuilder().writer(member).title("votogether1").save();
            PostOption postOptionA = postTestPersister.postOptionBuilder().post(postA).sequence(1).save();
            voteTestPersister.builder().postOption(postOptionA).save();
            voteTestPersister.builder().postOption(postOptionA).save();
            Post postB = postTestPersister.postBuilder().writer(member).content("votogether2").save();
            PostOption postOptionB = postTestPersister.postOptionBuilder().post(postB).sequence(1).save();
            voteTestPersister.builder().postOption(postOptionB).save();

            // when
            Pageable pageable = PageRequest.of(0, 10);
            List<Post> result = postCustomRepository.findSearchPostsWithFilteringAndPaging(
                    "votogether",
                    PostClosingType.ALL,
                    PostSortType.HOT,
                    pageable
            );

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).hasSize(2);
                softly.assertThat(result).containsExactly(postA, postB);
            });
        }

    }

    @Nested
    @DisplayName("투표자, 마감시간, 정렬기준으로 필터링하여 게시글 페이징 조회")
    class FindPostsByVotedWithFilteringAndPaging {

        @Test
        @DisplayName("마감되지 않은 게시글을 조회한다.")
        void getPostsOpen() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(1).truncatedTo(ChronoUnit.MINUTES);
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            voteTestPersister.builder().postOption(postOption).member(member).save();

            // when
            Pageable pageable = PageRequest.of(0, 10);
            List<Post> result = postCustomRepository.findPostsByVotedWithFilteringAndPaging(
                    member,
                    PostClosingType.PROGRESS,
                    PostSortType.LATEST,
                    pageable
            );

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).hasSize(1);
                softly.assertThat(result).containsExactly(post);
            });
        }

        @Test
        @DisplayName("마감된 게시글을 조회한다.")
        void getPostsClosed() {
            // given
            LocalDateTime deadline = LocalDateTime.now().minusDays(1).truncatedTo(ChronoUnit.MINUTES);
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            voteTestPersister.builder().postOption(postOption).member(member).save();

            // when
            Pageable pageable = PageRequest.of(0, 10);
            List<Post> result = postCustomRepository.findPostsByVotedWithFilteringAndPaging(
                    member,
                    PostClosingType.CLOSED,
                    PostSortType.LATEST,
                    pageable
            );

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).hasSize(1);
                softly.assertThat(result).containsExactly(post);
            });
        }

        @Test
        @DisplayName("게시글을 최신순으로 조회한다.")
        void getPostsByLatest() {
            // given
            Member member = memberTestPersister.builder().save();
            Post postA = postTestPersister.postBuilder().writer(member).save();
            Post postB = postTestPersister.postBuilder().writer(member).save();
            PostOption postOptionA = postTestPersister.postOptionBuilder().post(postA).sequence(1).save();
            PostOption postOptionB = postTestPersister.postOptionBuilder().post(postB).sequence(1).save();
            voteTestPersister.builder().postOption(postOptionA).member(member).save();
            voteTestPersister.builder().postOption(postOptionB).member(member).save();

            // when
            Pageable pageable = PageRequest.of(0, 10);
            List<Post> result = postCustomRepository.findPostsByVotedWithFilteringAndPaging(
                    member,
                    PostClosingType.ALL,
                    PostSortType.LATEST,
                    pageable
            );

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).hasSize(2);
                softly.assertThat(result).containsExactly(postB, postA);
            });
        }

        @Test
        @DisplayName("게시글을 인기순으로 조회한다.")
        void getPostsByHot() {
            // post
            Member member = memberTestPersister.builder().save();
            Post postA = postTestPersister.postBuilder().save();
            PostOption postOptionA = postTestPersister.postOptionBuilder().post(postA).sequence(1).save();
            voteTestPersister.builder().postOption(postOptionA).member(member).save();
            voteTestPersister.builder().postOption(postOptionA).save();
            Post postB = postTestPersister.postBuilder().writer(member).save();
            PostOption postOptionB = postTestPersister.postOptionBuilder().post(postB).sequence(1).save();
            voteTestPersister.builder().postOption(postOptionB).member(member).save();

            // when
            Pageable pageable = PageRequest.of(0, 10);
            List<Post> result = postCustomRepository.findPostsByVotedWithFilteringAndPaging(
                    member,
                    PostClosingType.ALL,
                    PostSortType.HOT,
                    pageable
            );

            // then
            assertSoftly(softly -> {
                softly.assertThat(result).hasSize(2);
                softly.assertThat(result).containsExactly(postA, postB);
            });
        }

    }

}
