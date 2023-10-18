package com.votogether.domain.post.dto.response.post;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "투표 옵션 투표 결과 응답")
public record PostOptionVoteResultResponse(
        @Schema(description = "투표 옵션 ID", example = "1")
        Long optionId,

        @Schema(description = "투표 옵션 내용", example = "짜장면")
        String content,

        @Schema(description = "투표 옵션 이미지 URL", example = "http://sdasdas.com")
        String imageUrl,

        @Schema(description = "투표 옵션 총 투표 수", example = "4")
        long voteCount,

        @Schema(description = "투표 옵션 투표 비율", example = "50.0")
        double votePercent
) {

    private static final int HIDDEN_COUNT = -1;
    private static final String EMPTY_IMAGE_URL = "";

    public static PostOptionVoteResultResponse ofUser(
            final Member user,
            final Post post,
            final PostOption postOption,
            final boolean isVoted,
            final long totalVoteCount
    ) {
        final long voteCount = countVotesForUser(user, post, postOption, isVoted);
        return new PostOptionVoteResultResponse(
                postOption.getId(),
                postOption.getContent(),
                handleEmptyImageUrl(postOption.getImageUrl()),
                voteCount,
                calculateVotePercent(totalVoteCount, voteCount)
        );
    }

    private static long countVotesForUser(
            final Member user,
            final Post post,
            final PostOption postOption,
            final boolean isVoted
    ) {
        if (post.isHidden() && post.isWriter(user)) {
            return HIDDEN_COUNT;
        }
        if (post.isClosed() || post.isWriter(user) || isVoted) {
            return postOption.getVoteCount();
        }
        return HIDDEN_COUNT;
    }

    private static String handleEmptyImageUrl(final String imageUrl) {
        if (imageUrl == null) {
            return EMPTY_IMAGE_URL;
        }
        return imageUrl;
    }

    private static double calculateVotePercent(final long totalCount, final long voteCount) {
        if (voteCount == HIDDEN_COUNT || totalCount == 0) {
            return 0.0;
        }
        final double votePercent = ((double) voteCount / totalCount) * 100;
        return Math.round(votePercent * 10) / 10.0;
    }

    public static PostOptionVoteResultResponse ofGuest(
            final Post post,
            final PostOption postOption,
            final long totalVoteCount
    ) {
        final long voteCount = countVotesForGuest(post, postOption);
        return new PostOptionVoteResultResponse(
                postOption.getId(),
                postOption.getContent(),
                handleEmptyImageUrl(postOption.getImageUrl()),
                voteCount,
                calculateVotePercent(totalVoteCount, voteCount)
        );
    }

    private static long countVotesForGuest(final Post post, final PostOption postOption) {
        if (post.isClosed()) {
            return postOption.getVoteCount();
        }
        return HIDDEN_COUNT;
    }

}
