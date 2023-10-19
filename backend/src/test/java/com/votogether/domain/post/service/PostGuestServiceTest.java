package com.votogether.domain.post.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.response.post.PostOptionVoteResultResponse;
import com.votogether.domain.post.dto.response.post.PostRankingResponse;
import com.votogether.domain.post.dto.response.post.PostResponse;
import com.votogether.domain.post.dto.response.post.PostVoteResultResponse;
import com.votogether.domain.post.dto.response.post.PostWriterResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import com.votogether.domain.post.repository.PostOptionRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.vote.entity.Vote;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import com.votogether.test.ServiceTest;
import jakarta.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.util.ReflectionTestUtils;

class PostGuestServiceTest extends ServiceTest {

    @Autowired
    PostGuestService postGuestService;

    @Autowired
    PostRepository postRepository;

    @Autowired
    PostOptionRepository postOptionRepository;

    @Autowired
    EntityManager em;

    @Nested
    @DisplayName("비회원 게시글 목록 조회")
    class GuestGetPosts {

        @Test
        @DisplayName("마감된 게시글은 결과를 확인할 수 있다.")
        void canCheckResultsClosedPosts() {
            // given
            LocalDateTime deadline = LocalDateTime.now().minusDays(1);
            Member writer = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(writer).voteCount(1).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).voteCount(1).save();
            Vote vote = voteTestPersister.builder().postOption(postOption).save();
            postOption.addVote(vote);
            post.addPostOption(postOption);

            // when
            List<PostResponse> result = postGuestService.getPosts(0, PostClosingType.ALL, PostSortType.LATEST, null);

            // then
            PostResponse expected = expectedResponse(post, writer, postOption, 0L, 1, 1, 100.0);
            assertThat(result).usingRecursiveComparison().isEqualTo(List.of(expected));
        }

        @Test
        @DisplayName("진행중인 게시글은 결과를 확인할 수 없다.")
        void cannotCheckResultsOpenPosts() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(1);
            Member writer = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(writer).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            Vote vote = voteTestPersister.builder().postOption(postOption).save();
            postOption.addVote(vote);
            post.addPostOption(postOption);

            // when
            List<PostResponse> result = postGuestService.getPosts(0, PostClosingType.ALL, PostSortType.LATEST, null);

            // then
            PostResponse expected = expectedResponse(post, writer, postOption, 0L, -1, -1, 0.0);
            assertThat(result).usingRecursiveComparison().isEqualTo(List.of(expected));
        }

    }

    @Nested
    @DisplayName("비회원 게시글 상세 조회")
    class GuestGetPost {

        @Test
        @DisplayName("마감된 게시글은 결과를 확인할 수 있다.")
        void canCheckResultsClosedPost() {
            // given
            LocalDateTime deadline = LocalDateTime.now().minusDays(1);
            Member writer = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(writer).voteCount(1).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).voteCount(1).save();
            Vote vote = voteTestPersister.builder().postOption(postOption).save();
            postOption.addVote(vote);
            post.addPostOption(postOption);

            // when
            PostResponse result = postGuestService.getPost(post.getId());

            // then
            PostResponse expected = expectedResponse(post, writer, postOption, 0L, 1, 1, 100.0);
            assertThat(result).usingRecursiveComparison().isEqualTo(expected);
        }

        @Test
        @DisplayName("진행중인 게시글은 결과를 확인할 수 없다.")
        void cannotCheckResultsOpenPosts() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(1);
            Member writer = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(writer).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            Vote vote = voteTestPersister.builder().postOption(postOption).save();
            postOption.addVote(vote);
            post.addPostOption(postOption);

            // when
            PostResponse result = postGuestService.getPost(post.getId());

            // then
            PostResponse expected = expectedResponse(post, writer, postOption, 0L, -1, -1, 0.0);
            assertThat(result).usingRecursiveComparison().isEqualTo(expected);
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

        @Test
        @DisplayName("블라인드된 게시글이라면 예외를 던진다.")
        void throwExceptionBlindPost() {
            // given
            Post post = postTestPersister.postBuilder().save();
            post.blind();

            // when, then
            assertThatThrownBy(() -> postGuestService.getPost(post.getId()))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("신고에 의해 숨겨진 게시글은 접근할 수 없습니다.");
        }

    }

    @Nested
    @DisplayName("비회원 게시글 목록 검색")
    class GuestSearchPosts {

        @Test
        @DisplayName("마감된 게시글은 결과를 확인할 수 있다.")
        void canCheckResultsClosedPosts() {
            // given
            LocalDateTime deadline = LocalDateTime.now().minusDays(1);
            Member writer = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(writer).voteCount(1).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).voteCount(1).save();
            Vote vote = voteTestPersister.builder().postOption(postOption).save();
            postOption.addVote(vote);
            post.addPostOption(postOption);

            // when
            List<PostResponse> result =
                    postGuestService.searchPosts(post.getTitle(), 0, PostClosingType.ALL, PostSortType.LATEST);

            // then
            PostResponse expected = expectedResponse(post, writer, postOption, 0L, 1, 1, 100.0);
            assertThat(result).usingRecursiveComparison().isEqualTo(List.of(expected));
        }

        @Test
        @DisplayName("진행중인 게시글은 결과를 확인할 수 없다.")
        void cannotCheckResultsOpenPosts() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(1);
            Member writer = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(writer).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            Vote vote = voteTestPersister.builder().postOption(postOption).save();
            postOption.addVote(vote);
            post.addPostOption(postOption);

            // when
            List<PostResponse> result =
                    postGuestService.searchPosts(post.getTitle(), 0, PostClosingType.ALL, PostSortType.LATEST);

            // then
            PostResponse expected = expectedResponse(post, writer, postOption, 0L, -1, -1, 0.0);
            assertThat(result).usingRecursiveComparison().isEqualTo(List.of(expected));
        }

    }

    @Nested
    @DisplayName("상위 10개 인기 게시물을 조회한다.")
    class Ranking {

        @Test
        @DisplayName("중복 순위가 있는 경우")
        void getRanking() {
            // given
            List<Post> posts = new ArrayList<>();
            List<PostOption> postOptions = new ArrayList<>();

            for (int i = 0; i < 11; i++) {
                Post post = postTestPersister.postBuilder().voteCount(i + 1).save();
                PostOption postOption = postTestPersister.postOptionBuilder().post(post).voteCount(i + 1).save();
                posts.add(post);
                postOptions.add(postOption);
            }

            for (int i = 0; i < 10; i++) {
                for (int j = 0; j < i + 1; j++) {
                    voteTestPersister.builder().postOption(postOptions.get(i)).save();
                }
            }

            voteTestPersister.builder().postOption(postOptions.get(10)).save();
            voteTestPersister.builder().postOption(postOptions.get(10)).save();
            voteTestPersister.builder().postOption(postOptions.get(10)).save();
            voteTestPersister.builder().postOption(postOptions.get(7)).save();
            ReflectionTestUtils.setField(posts.get(10), "voteCount", 3);
            ReflectionTestUtils.setField(postOptions.get(10), "voteCount", 3);
            posts.get(7).increaseVoteCount();
            postOptions.get(7).increaseVoteCount();

            /*
            index       |0| |1| |2| |3| |4| |5| |6| |7| |8| |9| |10|
            voteCount   |1| |2| |3| |4| |5| |6| |7| |9| |9| |10| |3|
            ranking     |11| |10| |8| |7| |6| |5| |4| |2| |2| |1| |8|
            */

            // when
            List<PostRankingResponse> rankings = postGuestService.getRanking();

            // then
            assertAll(
                    () -> assertThat(rankings).hasSize(10),
                    () -> assertThat(rankings.get(0).ranking()).isEqualTo(1),
                    () -> assertThat(rankings.get(1).ranking()).isEqualTo(2),
                    () -> assertThat(rankings.get(2).ranking()).isEqualTo(2),
                    () -> assertThat(rankings.get(3).ranking()).isEqualTo(4),
                    () -> assertThat(rankings.get(4).ranking()).isEqualTo(5),
                    () -> assertThat(rankings.get(5).ranking()).isEqualTo(6),
                    () -> assertThat(rankings.get(6).ranking()).isEqualTo(7),
                    () -> assertThat(rankings.get(7).ranking()).isEqualTo(8),
                    () -> assertThat(rankings.get(8).ranking()).isEqualTo(8),
                    () -> assertThat(rankings.get(9).ranking()).isEqualTo(10),
                    () -> assertThat(rankings.get(0).postSummaryResponse().id()).isEqualTo(posts.get(9).getId()),
                    () -> assertThat(rankings.get(3).postSummaryResponse().id()).isEqualTo(posts.get(6).getId()),
                    () -> assertThat(rankings.get(4).postSummaryResponse().id()).isEqualTo(posts.get(5).getId()),
                    () -> assertThat(rankings.get(5).postSummaryResponse().id()).isEqualTo(posts.get(4).getId()),
                    () -> assertThat(rankings.get(6).postSummaryResponse().id()).isEqualTo(posts.get(3).getId()),
                    () -> assertThat(rankings.get(9).postSummaryResponse().id()).isEqualTo(posts.get(1).getId()),
                    () -> assertThat(List.of(
                            rankings.get(7).postSummaryResponse().id(),
                            rankings.get(8).postSummaryResponse().id()
                    ).containsAll(List.of(posts.get(10).getId(), posts.get(2).getId()))),
                    () -> assertThat(List.of(
                            rankings.get(1).postSummaryResponse().id(),
                            rankings.get(2).postSummaryResponse().id()
                    ).containsAll(List.of(posts.get(7).getId(), posts.get(8).getId())))
            );
        }

        @Test
        @DisplayName("중복 순위가 없는 경우")
        void getRanking1() {
            // given
            List<Post> posts = new ArrayList<>();
            List<PostOption> postOptions = new ArrayList<>();

            for (int i = 0; i < 10; i++) {
                Post post = postTestPersister.postBuilder().voteCount(i + 1).save();
                PostOption postOption = postTestPersister.postOptionBuilder().post(post).voteCount(i + 1).save();
                posts.add(post);
                postOptions.add(postOption);
            }

            for (int i = 0; i < 10; i++) {
                for (int j = 0; j < i + 1; j++) {
                    voteTestPersister.builder().postOption(postOptions.get(i)).save();
                }
            }

            /*
            index       |0| |1| |2| |3| |4| |5| |6| |7| |8| |9|
            voteCount   |1| |2| |3| |4| |5| |6| |7| |8| |9| |10|
            ranking     |10| |9| |8| |7| |6| |5| |4| |3| |2| |1|
            */

            em.flush();
            em.clear();

            // when
            List<PostRankingResponse> rankings = postGuestService.getRanking();

            // then
            assertAll(
                    () -> assertThat(rankings).hasSize(10),
                    () -> assertThat(rankings.get(0).ranking()).isEqualTo(1),
                    () -> assertThat(rankings.get(1).ranking()).isEqualTo(2),
                    () -> assertThat(rankings.get(2).ranking()).isEqualTo(3),
                    () -> assertThat(rankings.get(3).ranking()).isEqualTo(4),
                    () -> assertThat(rankings.get(4).ranking()).isEqualTo(5),
                    () -> assertThat(rankings.get(5).ranking()).isEqualTo(6),
                    () -> assertThat(rankings.get(6).ranking()).isEqualTo(7),
                    () -> assertThat(rankings.get(7).ranking()).isEqualTo(8),
                    () -> assertThat(rankings.get(8).ranking()).isEqualTo(9),
                    () -> assertThat(rankings.get(9).ranking()).isEqualTo(10),
                    () -> assertThat(rankings.get(0).postSummaryResponse().id()).isEqualTo(posts.get(9).getId()),
                    () -> assertThat(rankings.get(1).postSummaryResponse().id()).isEqualTo(posts.get(8).getId()),
                    () -> assertThat(rankings.get(2).postSummaryResponse().id()).isEqualTo(posts.get(7).getId()),
                    () -> assertThat(rankings.get(3).postSummaryResponse().id()).isEqualTo(posts.get(6).getId()),
                    () -> assertThat(rankings.get(4).postSummaryResponse().id()).isEqualTo(posts.get(5).getId()),
                    () -> assertThat(rankings.get(5).postSummaryResponse().id()).isEqualTo(posts.get(4).getId()),
                    () -> assertThat(rankings.get(6).postSummaryResponse().id()).isEqualTo(posts.get(3).getId()),
                    () -> assertThat(rankings.get(7).postSummaryResponse().id()).isEqualTo(posts.get(2).getId()),
                    () -> assertThat(rankings.get(8).postSummaryResponse().id()).isEqualTo(posts.get(1).getId()),
                    () -> assertThat(rankings.get(9).postSummaryResponse().id()).isEqualTo(posts.get(0).getId())
            );
        }

    }

    private PostResponse expectedResponse(
            final Post post,
            final Member writer,
            final PostOption postOption,
            final long selectedOptionId,
            final int totalVoteCount,
            final int postOptionVoteCount,
            final double votePercent
    ) {
        return new PostResponse(
                post.getId(),
                new PostWriterResponse(writer.getId(), writer.getNickname()),
                post.getTitle(),
                post.getContent(),
                "",
                Collections.emptyList(),
                post.getCreatedAt(),
                post.getDeadline(),
                0,
                0,
                new PostVoteResultResponse(
                        selectedOptionId,
                        totalVoteCount,
                        List.of(
                                new PostOptionVoteResultResponse(
                                        postOption.getId(),
                                        postOption.getContent(),
                                        "",
                                        postOptionVoteCount,
                                        votePercent
                                )
                        )
                )
        );
    }

}
