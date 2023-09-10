package com.votogether.domain.post.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.response.post.PostOptionVoteResultResponse;
import com.votogether.domain.post.dto.response.post.PostResponse;
import com.votogether.domain.post.dto.response.post.PostVoteResultResponse;
import com.votogether.domain.post.dto.response.post.PostWriterResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import com.votogether.domain.vote.entity.Vote;
import com.votogether.global.exception.NotFoundException;
import com.votogether.test.ServiceTest;
import java.time.LocalDateTime;
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

    @Nested
    @DisplayName("비회원 게시글 목록 조회")
    class GuestGetPosts {

        @Test
        @DisplayName("마감된 게시글은 결과를 확인할 수 있다.")
        void canCheckResultsClosedPosts() {
            // given
            LocalDateTime deadline = LocalDateTime.now().minusDays(1);
            Member writer = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(writer).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            Vote vote = voteTestPersister.builder().postOption(postOption).save();
            postOption.addVote(vote);
            post.addPostOption(postOption);
            ReflectionTestUtils.setField(postOption, "voteCount", 1);

            // when
            List<PostResponse> result = postGuestService.getPosts(0, PostClosingType.ALL, PostSortType.LATEST, null);

            // then
            PostResponse expected = expectedResponse(post, writer, postOption, 0L, 1, 1, 1.0);
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
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(writer).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            Vote vote = voteTestPersister.builder().postOption(postOption).save();
            postOption.addVote(vote);
            post.addPostOption(postOption);
            ReflectionTestUtils.setField(postOption, "voteCount", 1);

            // when
            PostResponse result = postGuestService.getPost(post.getId());

            // then
            PostResponse expected = expectedResponse(post, writer, postOption, 0L, 1, 1, 1.0);
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
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(writer).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            Vote vote = voteTestPersister.builder().postOption(postOption).save();
            postOption.addVote(vote);
            post.addPostOption(postOption);
            ReflectionTestUtils.setField(postOption, "voteCount", 1);

            // when
            List<PostResponse> result =
                    postGuestService.searchPosts(post.getTitle(), 0, PostClosingType.ALL, PostSortType.LATEST);

            // then
            PostResponse expected = expectedResponse(post, writer, postOption, 0L, 1, 1, 1.0);
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
