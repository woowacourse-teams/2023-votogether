package com.votogether.domain.post.dto.response.vote;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.response.post.PostOptionVoteResultResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.vote.entity.Vote;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.Optional;

@Schema(description = "게시글 투표 결과 응답")
public record PostVoteResultResponse(
        @Schema(description = "선택한 투표 옵션 ID", example = "1")
        Long selectedOptionId,

        @Schema(description = "게시글 총 투표 수", example = "7")
        long totalVoteCount,

        @Schema(description = "투표 옵션 투표 결과 목록")
        List<PostOptionVoteResultResponse> options
) {

    private static final int HIDDEN_COUNT = -1;
    private static final Long NOT_SELECTED = 0L;

    public static PostVoteResultResponse ofUser(
            final Member user,
            final Post post,
            final List<PostOption> postOptions,
            final Optional<Vote> vote
    ) {
        final int totalVoteCount = countTotalVoteCount(postOptions);
        return new PostVoteResultResponse(
                findSelectedOption(vote),
                countVotesForUser(user, post, vote.isPresent(), totalVoteCount),
                convertToUserResponses(user, post, postOptions, vote.isPresent(), totalVoteCount)
        );
    }

    private static int countTotalVoteCount(final List<PostOption> postOptions) {
        return postOptions.stream()
                .mapToInt(PostOption::getVoteCount)
                .sum();
    }

    private static Long findSelectedOption(final Optional<Vote> vote) {
        if (vote.isEmpty()) {
            return NOT_SELECTED;
        }
        return vote.get().getPostOption().getId();
    }

    private static int countVotesForUser(
            final Member user,
            final Post post,
            final boolean isVoted,
            final int totalVoteCount
    ) {
        if (post.isClosed() || post.isWriter(user) || isVoted) {
            return totalVoteCount;
        }
        return HIDDEN_COUNT;
    }

    private static List<PostOptionVoteResultResponse> convertToUserResponses(
            final Member user,
            final Post post,
            final List<PostOption> postOptions,
            final boolean isVoted,
            final int totalVoteCount
    ) {
        return postOptions.stream()
                .map(postOption -> PostOptionVoteResultResponse.ofUser(user, post, postOption, isVoted, totalVoteCount))
                .toList();
    }

    public static PostVoteResultResponse ofGuest(final Post post, final List<PostOption> postOptions) {
        final int totalVoteCount = countTotalVoteCount(postOptions);
        return new PostVoteResultResponse(
                NOT_SELECTED,
                countVotesForGuest(post, totalVoteCount),
                convertToGuestResponses(post, postOptions, totalVoteCount)
        );
    }

    private static int countVotesForGuest(final Post post, final int totalVoteCount) {
        if (post.isClosed()) {
            return totalVoteCount;
        }
        return HIDDEN_COUNT;
    }

    private static List<PostOptionVoteResultResponse> convertToGuestResponses(
            final Post post,
            final List<PostOption> postOptions,
            final int totalVoteCount
    ) {
        return postOptions.stream()
                .map(postOption -> PostOptionVoteResultResponse.ofGuest(post, postOption, totalVoteCount))
                .toList();
    }

}
