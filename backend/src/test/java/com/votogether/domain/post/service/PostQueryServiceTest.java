package com.votogether.domain.post.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.vo.AgeRange;
import com.votogether.domain.member.entity.vo.Gender;
import com.votogether.domain.post.dto.response.post.PostOptionVoteResultResponse;
import com.votogether.domain.post.dto.response.post.PostResponse;
import com.votogether.domain.post.dto.response.post.PostVoteResultResponse;
import com.votogether.domain.post.dto.response.post.PostWriterResponse;
import com.votogether.domain.post.dto.response.vote.VoteCountForAgeGroupResponse;
import com.votogether.domain.post.dto.response.vote.VoteOptionStatisticsResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import com.votogether.domain.vote.entity.Vote;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import com.votogether.test.ServiceTest;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class PostQueryServiceTest extends ServiceTest {

    @Autowired
    PostQueryService postQueryService;

    @Nested
    @DisplayName("회원 게시글 목록 조회")
    class FindPosts {

        @Test
        @DisplayName("내가 쓴 게시글도 아니고 투표한 게시글도 아닐 때 진행중인 게시글은 결과를 확인할 수 없다.")
        void findPostsOpen() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(1);
            Member writer = memberTestPersister.builder().save();
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(writer).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            post.addPostOption(postOption);

            // when
            List<PostResponse> result =
                    postQueryService.getPosts(0, PostClosingType.ALL, PostSortType.LATEST, null, member);

            // then
            PostResponse expected = expectedResponse(post, writer, postOption, 0L, -1, -1, 0.0);
            assertThat(result).usingRecursiveComparison().isEqualTo(List.of(expected));
        }

        @Test
        @DisplayName("마감된 게시글은 결과를 확인할 수 있다.")
        void findPostsClosed() {
            // given
            LocalDateTime deadline = LocalDateTime.now().minusDays(1);
            Member writer = memberTestPersister.builder().save();
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(writer).voteCount(1).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).voteCount(1).save();
            Vote vote = voteTestPersister.builder().postOption(postOption).save();
            postOption.addVote(vote);
            post.addPostOption(postOption);

            // when
            List<PostResponse> result =
                    postQueryService.getPosts(0, PostClosingType.ALL, PostSortType.LATEST, null, member);

            // then
            PostResponse expected = expectedResponse(post, writer, postOption, 0L, 1, 1, 100.0);
            assertThat(result).usingRecursiveComparison().isEqualTo(List.of(expected));
        }

        @Test
        @DisplayName("내가 쓴 게시글은 결과를 확인할 수 있다.")
        void findPostsWritten() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(1);
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(member).voteCount(1).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).voteCount(1).save();
            Vote vote = voteTestPersister.builder().postOption(postOption).save();
            postOption.addVote(vote);
            post.addPostOption(postOption);

            // when
            List<PostResponse> result =
                    postQueryService.getPosts(0, PostClosingType.ALL, PostSortType.LATEST, null, member);

            // then
            PostResponse expected = expectedResponse(post, member, postOption, 0L, 1, 1, 100.0);
            assertThat(result).usingRecursiveComparison().isEqualTo(List.of(expected));
        }

        @Test
        @DisplayName("투표한 게시글은 결과를 확인할 수 있다.")
        void findPostsVoted() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(1);
            Member writer = memberTestPersister.builder().save();
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(writer).voteCount(1).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).voteCount(1).save();
            Vote vote = voteTestPersister.builder().postOption(postOption).member(member).save();
            postOption.addVote(vote);
            post.addPostOption(postOption);

            // when
            List<PostResponse> result =
                    postQueryService.getPosts(0, PostClosingType.ALL, PostSortType.LATEST, null, member);

            // then
            PostResponse expected = expectedResponse(post, writer, postOption, postOption.getId(), 1, 1, 100.0);
            assertThat(result).usingRecursiveComparison().isEqualTo(List.of(expected));
        }

    }

    @Nested
    @DisplayName("회원 게시글 조회")
    class FindPost {

        @Test
        @DisplayName("존재하지 않는 게시글이면 예외를 던진다.")
        void throwExceptionNotExistPost() {
            // given
            Member member = memberTestPersister.builder().save();

            // when, then
            assertThatThrownBy(() -> postQueryService.getPost(-1L, member))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("게시글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("작성자가 아니고 블라인드된 게시글이면 예외를 던진다.")
        void throwExceptionBlindPost() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();
            post.blind();

            // when, then
            assertThatThrownBy(() -> postQueryService.getPost(post.getId(), member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("신고에 의해 숨겨진 게시글은 접근할 수 없습니다.");
        }

        @Test
        @DisplayName("작성자는 블라인드된 게시글은 조회 할 수 있다.")
        void throwExceptionBlindPost1() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();
            post.blind();

            // when
            PostResponse result = postQueryService.getPost(post.getId(), member);

            // then
            assertThat(result.postId()).isEqualTo(result.postId());
        }

        @Test
        @DisplayName("작성자는 블라인드된 게시글의 결과를 확인 할 수 없다.")
        void throwExceptionBlindPost2() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            post.addPostOption(postOption);
            post.blind();

            // when
            PostResponse result = postQueryService.getPost(post.getId(), member);

            // then
            PostResponse expected = expectedResponse(post, member, postOption, 0L, -1, -1, 0.0);
            assertThat(result).usingRecursiveComparison().isEqualTo(expected);
        }

        @Test
        @DisplayName("내가 쓴 게시글도 아니고 투표한 게시글도 아닐 때 진행중인 게시글은 결과를 확인할 수 없다.")
        void findPostsOpen() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(1);
            Member writer = memberTestPersister.builder().save();
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(writer).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            post.addPostOption(postOption);

            // when
            PostResponse result = postQueryService.getPost(post.getId(), member);

            // then
            PostResponse expected = expectedResponse(post, writer, postOption, 0L, -1, -1, 0.0);
            assertThat(result).usingRecursiveComparison().isEqualTo(expected);
        }

        @Test
        @DisplayName("마감된 게시글은 결과를 확인할 수 있다.")
        void findPostsClosed() {
            // given
            LocalDateTime deadline = LocalDateTime.now().minusDays(1);
            Member writer = memberTestPersister.builder().save();
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(writer).voteCount(1).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).voteCount(1).save();
            Vote vote = voteTestPersister.builder().postOption(postOption).save();
            postOption.addVote(vote);
            post.addPostOption(postOption);

            // when
            PostResponse result = postQueryService.getPost(post.getId(), member);

            // then
            PostResponse expected = expectedResponse(post, writer, postOption, 0L, 1, 1, 100.0);
            assertThat(result).usingRecursiveComparison().isEqualTo(expected);
        }

        @Test
        @DisplayName("내가 쓴 게시글은 결과를 확인할 수 없다.")
        void findPostsWritten() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(1);
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(member).voteCount(1).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).voteCount(1).save();
            Vote vote = voteTestPersister.builder().postOption(postOption).save();
            postOption.addVote(vote);
            post.addPostOption(postOption);

            // when
            PostResponse result = postQueryService.getPost(post.getId(), member);

            // then
            PostResponse expected = expectedResponse(post, member, postOption, 0L, 1, 1, 100.0);
            assertThat(result).usingRecursiveComparison().isEqualTo(expected);
        }

        @Test
        @DisplayName("투표한 게시글은 결과를 확인할 수 있다.")
        void findPostsVoted() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(1);
            Member writer = memberTestPersister.builder().save();
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(writer).voteCount(1).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).voteCount(1).save();
            Vote vote = voteTestPersister.builder().postOption(postOption).member(member).save();
            postOption.addVote(vote);
            post.addPostOption(postOption);

            // when
            PostResponse result = postQueryService.getPost(post.getId(), member);

            // then
            PostResponse expected = expectedResponse(post, writer, postOption, postOption.getId(), 1, 1, 100.0);
            assertThat(result).usingRecursiveComparison().isEqualTo(expected);
        }

    }

    @Nested
    @DisplayName("회원 게시글 검색")
    class SearchPosts {

        @Test
        @DisplayName("내가 쓴 게시글도 아니고 투표한 게시글도 아닐 때 진행중인 게시글은 결과를 확인할 수 없다.")
        void searchPostsOpen() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(1);
            Member writer = memberTestPersister.builder().save();
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(writer).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            post.addPostOption(postOption);

            // when
            List<PostResponse> result =
                    postQueryService.searchPosts(post.getTitle(), 0, PostClosingType.ALL, PostSortType.LATEST, member);

            // then
            PostResponse expected = expectedResponse(post, writer, postOption, 0L, -1, -1, 0.0);
            assertThat(result).usingRecursiveComparison().isEqualTo(List.of(expected));
        }

        @Test
        @DisplayName("마감된 게시글은 결과를 확인할 수 있다.")
        void searchPostsClosed() {
            // given
            LocalDateTime deadline = LocalDateTime.now().minusDays(1);
            Member writer = memberTestPersister.builder().save();
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(writer).voteCount(1).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).voteCount(1).save();
            Vote vote = voteTestPersister.builder().postOption(postOption).save();
            postOption.addVote(vote);
            post.addPostOption(postOption);

            // when
            List<PostResponse> result =
                    postQueryService.searchPosts(post.getTitle(), 0, PostClosingType.ALL, PostSortType.LATEST, member);

            // then
            PostResponse expected = expectedResponse(post, writer, postOption, 0L, 1, 1, 100.0);
            assertThat(result).usingRecursiveComparison().isEqualTo(List.of(expected));
        }

        @Test
        @DisplayName("내가 쓴 게시글은 결과를 확인할 수 없다.")
        void searchPostsWritten() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(1);
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(member).voteCount(1).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).voteCount(1).save();
            Vote vote = voteTestPersister.builder().postOption(postOption).save();
            postOption.addVote(vote);
            post.addPostOption(postOption);

            // when
            List<PostResponse> result =
                    postQueryService.searchPosts(post.getTitle(), 0, PostClosingType.ALL, PostSortType.LATEST, member);

            // then
            PostResponse expected = expectedResponse(post, member, postOption, 0L, 1, 1, 100.0);
            assertThat(result).usingRecursiveComparison().isEqualTo(List.of(expected));
        }

        @Test
        @DisplayName("투표한 게시글은 결과를 확인할 수 있다.")
        void searchPostsVoted() {
            // given
            LocalDateTime deadline = LocalDateTime.now().plusDays(1);
            Member writer = memberTestPersister.builder().save();
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(deadline).writer(writer).voteCount(1).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).voteCount(1).save();
            Vote vote = voteTestPersister.builder().postOption(postOption).member(member).save();
            postOption.addVote(vote);
            post.addPostOption(postOption);

            // when
            List<PostResponse> result =
                    postQueryService.searchPosts(post.getTitle(), 0, PostClosingType.ALL, PostSortType.LATEST, member);

            // then
            PostResponse expected = expectedResponse(post, writer, postOption, postOption.getId(), 1, 1, 100.0);
            assertThat(result).usingRecursiveComparison().isEqualTo(List.of(expected));
        }

    }

    @Test
    @DisplayName("내가 쓴 게시글 목록을 조회한다.")
    void findPostWritten() {
        // given
        LocalDateTime open = LocalDateTime.now().plusDays(1);
        LocalDateTime closed = LocalDateTime.now().minusDays(1);
        Member member = memberTestPersister.builder().save();
        Post postA = postTestPersister.postBuilder().deadline(open).writer(member).voteCount(1).save();
        Post postB = postTestPersister.postBuilder().deadline(closed).writer(member).voteCount(1).save();
        PostOption postOptionA = postTestPersister.postOptionBuilder().post(postA).sequence(1).voteCount(1).save();
        PostOption postOptionB = postTestPersister.postOptionBuilder().post(postB).sequence(1).voteCount(1).save();
        Vote voteA = voteTestPersister.builder().postOption(postOptionA).save();
        Vote voteB = voteTestPersister.builder().postOption(postOptionB).save();
        postOptionA.addVote(voteA);
        postOptionB.addVote(voteB);
        postA.addPostOption(postOptionA);
        postB.addPostOption(postOptionB);

        // when
        List<PostResponse> result =
                postQueryService.getPostsWrittenByMe(0, PostClosingType.ALL, PostSortType.LATEST, member);

        // then
        PostResponse expectedA = expectedResponse(postA, member, postOptionA, 0L, 1, 1, 100.0);
        PostResponse expectedB = expectedResponse(postB, member, postOptionB, 0L, 1, 1, 100.0);
        assertThat(result).usingRecursiveComparison().isEqualTo(List.of(expectedB, expectedA));
    }

    @Test
    @DisplayName("내가 투표한 게시글 목록을 조회한다.")
    void findPostsVoted() {
        // given
        LocalDateTime open = LocalDateTime.now().plusDays(1);
        LocalDateTime closed = LocalDateTime.now().minusDays(1);
        Member member = memberTestPersister.builder().save();
        Member writer = memberTestPersister.builder().save();
        Post postA = postTestPersister.postBuilder().deadline(open).writer(writer).voteCount(1).save();
        Post postB = postTestPersister.postBuilder().deadline(closed).writer(writer).voteCount(1).save();
        PostOption postOptionA = postTestPersister.postOptionBuilder().post(postA).sequence(1).voteCount(1).save();
        PostOption postOptionB = postTestPersister.postOptionBuilder().post(postB).sequence(1).voteCount(1).save();
        Vote voteA = voteTestPersister.builder().postOption(postOptionA).member(member).save();
        Vote voteB = voteTestPersister.builder().postOption(postOptionB).member(member).save();
        postOptionA.addVote(voteA);
        postOptionB.addVote(voteB);
        postA.addPostOption(postOptionA);
        postB.addPostOption(postOptionB);

        // when
        List<PostResponse> result =
                postQueryService.getPostsVotedByMe(0, PostClosingType.ALL, PostSortType.LATEST, member);

        // then
        PostResponse expectedA = expectedResponse(postA, writer, postOptionA, postOptionA.getId(), 1, 1, 100.0);
        PostResponse expectedB = expectedResponse(postB, writer, postOptionB, postOptionB.getId(), 1, 1, 100.0);
        assertThat(result).usingRecursiveComparison().isEqualTo(List.of(expectedB, expectedA));
    }

    @Nested
    @DisplayName("게시글의 투표 통계 조회")
    class GetPostVoteStatistics {

        @Test
        @DisplayName("존재하지 않는 게시글이라면 예외를 던진다.")
        void throwExceptionNotExist() {
            // given
            Member member = memberTestPersister.builder().save();

            // when, then
            assertThatThrownBy(() -> postQueryService.getVoteStatistics(-1L, member))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("게시글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("블라인드된 게시글이라면 예외를 던진다.")
        void throwExceptionBlindPost() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();
            post.blind();

            // when, then
            assertThatThrownBy(() -> postQueryService.getVoteStatistics(post.getId(), member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("신고에 의해 숨겨진 게시글은 접근할 수 없습니다.");
        }

        @Test
        @DisplayName("게시글 작성자가 아니라면 예외를 던진다.")
        void throwExceptionNotWriter() {
            // given
            LocalDateTime open = LocalDateTime.now().plusDays(1);
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(open).save();

            // when, then
            assertThatThrownBy(() -> postQueryService.getVoteStatistics(post.getId(), member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("게시글 작성자가 아닙니다.");
        }

        @Test
        @DisplayName("게시글 작성자라면 투표 통계를 조회한다.")
        void getPostVoteStatistics() {
            // given
            LocalDateTime open = LocalDateTime.now().plusDays(1);
            Member member = memberTestPersister.builder().save();
            Member voter = memberTestPersister.builder().birthYear(1993).gender(Gender.MALE).save();
            Post post = postTestPersister.postBuilder().deadline(open).writer(member).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            Vote vote = voteTestPersister.builder().postOption(postOption).member(voter).save();
            postOption.addVote(vote);
            post.addPostOption(postOption);

            // when
            VoteOptionStatisticsResponse result = postQueryService.getVoteStatistics(post.getId(), member);

            // then
            VoteOptionStatisticsResponse expected = new VoteOptionStatisticsResponse(
                    1,
                    1,
                    0,
                    List.of(
                            new VoteCountForAgeGroupResponse(
                                    AgeRange.UNDER_TEENS.getName(),
                                    0,
                                    0,
                                    0
                            ),
                            new VoteCountForAgeGroupResponse(
                                    AgeRange.TEENS.getName(),
                                    0,
                                    0,
                                    0
                            ),
                            new VoteCountForAgeGroupResponse(
                                    AgeRange.TWENTIES.getName(),
                                    0,
                                    0,
                                    0
                            ),
                            new VoteCountForAgeGroupResponse(
                                    AgeRange.THIRTIES.getName(),
                                    1,
                                    1,
                                    0
                            ),
                            new VoteCountForAgeGroupResponse(
                                    AgeRange.FORTIES.getName(),
                                    0,
                                    0,
                                    0
                            ),
                            new VoteCountForAgeGroupResponse(
                                    AgeRange.FIFTIES.getName(),
                                    0,
                                    0,
                                    0
                            ),
                            new VoteCountForAgeGroupResponse(
                                    AgeRange.OVER_SIXTIES.getName(),
                                    0,
                                    0,
                                    0
                            )
                    )
            );
            assertThat(result).usingRecursiveComparison().isEqualTo(expected);
        }

    }

    @Nested
    @DisplayName("게시글 옵션의 투표 통계 조회")
    class GetPostOptionVoteStatistics {

        @Test
        @DisplayName("존재하지 않는 게시글이라면 예외를 던진다.")
        void throwExceptionNotExistPost() {
            // given
            Member member = memberTestPersister.builder().save();

            // when, then
            assertThatThrownBy(() -> postQueryService.getVoteOptionStatistics(-1L, 1L, member))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("게시글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("블라인드된 게시글이라면 예외를 던진다.")
        void throwExceptionBlindPost() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            post.blind();

            // when, then
            assertThatThrownBy(() -> postQueryService.getVoteOptionStatistics(post.getId(), postOption.getId(), member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("신고에 의해 숨겨진 게시글은 접근할 수 없습니다.");
        }

        @Test
        @DisplayName("존재하지 않는 게시글 옵션이라면 예외를 던진다.")
        void throwExceptionNotExistOption() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();

            // when, then
            assertThatThrownBy(() -> postQueryService.getVoteOptionStatistics(post.getId(), -1L, member))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("게시글 투표 옵션이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("게시글 작성자가 아니라면 예외를 던진다.")
        void throwExceptionNotWriter() {
            // given
            LocalDateTime open = LocalDateTime.now().plusDays(1);
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(open).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();

            // when, then
            assertThatThrownBy(() -> postQueryService.getVoteOptionStatistics(post.getId(), postOption.getId(), member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("게시글 작성자가 아닙니다.");
        }

        @Test
        @DisplayName("게시글의 옵션이 아니라면 예외를 던진다.")
        void throwExceptionNotBelongPost() {
            // given
            LocalDateTime open = LocalDateTime.now().plusDays(1);
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().deadline(open).writer(member).save();
            PostOption postOption = postTestPersister.postOptionBuilder().sequence(1).save();

            // when, then
            assertThatThrownBy(() -> postQueryService.getVoteOptionStatistics(post.getId(), postOption.getId(), member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("게시글의 투표 옵션이 아닙니다.");
        }

        @Test
        @DisplayName("게시글 작성자라면 투표 통계를 조회한다.")
        void getPostOptionVoteStatistics() {
            // given
            LocalDateTime open = LocalDateTime.now().plusDays(1);
            Member member = memberTestPersister.builder().save();
            Member voter = memberTestPersister.builder().birthYear(1993).gender(Gender.MALE).save();
            Post post = postTestPersister.postBuilder().deadline(open).writer(member).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            Vote vote = voteTestPersister.builder().postOption(postOption).member(voter).save();
            postOption.addVote(vote);
            post.addPostOption(postOption);

            // when
            VoteOptionStatisticsResponse result =
                    postQueryService.getVoteOptionStatistics(post.getId(), postOption.getId(), member);

            // then
            VoteOptionStatisticsResponse expected = new VoteOptionStatisticsResponse(
                    1,
                    1,
                    0,
                    List.of(
                            new VoteCountForAgeGroupResponse(
                                    AgeRange.UNDER_TEENS.getName(),
                                    0,
                                    0,
                                    0
                            ),
                            new VoteCountForAgeGroupResponse(
                                    AgeRange.TEENS.getName(),
                                    0,
                                    0,
                                    0
                            ),
                            new VoteCountForAgeGroupResponse(
                                    AgeRange.TWENTIES.getName(),
                                    0,
                                    0,
                                    0
                            ),
                            new VoteCountForAgeGroupResponse(
                                    AgeRange.THIRTIES.getName(),
                                    1,
                                    1,
                                    0
                            ),
                            new VoteCountForAgeGroupResponse(
                                    AgeRange.FORTIES.getName(),
                                    0,
                                    0,
                                    0
                            ),
                            new VoteCountForAgeGroupResponse(
                                    AgeRange.FIFTIES.getName(),
                                    0,
                                    0,
                                    0
                            ),
                            new VoteCountForAgeGroupResponse(
                                    AgeRange.OVER_SIXTIES.getName(),
                                    0,
                                    0,
                                    0
                            )
                    )
            );
            assertThat(result).usingRecursiveComparison().isEqualTo(expected);
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
