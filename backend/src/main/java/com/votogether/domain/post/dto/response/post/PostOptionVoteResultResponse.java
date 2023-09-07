package com.votogether.domain.post.dto.response.post;

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
        int voteCount,

        @Schema(description = "투표 옵션 투표 비율", example = "50.0")
        double votePercent
) {

    private static final int HIDDEN_COUNT = -1;

    public static PostOptionVoteResultResponse of(final Post post, final PostOption postOption) {
        return new PostOptionVoteResultResponse(
                postOption.getId(),
                postOption.getContent(),
                convertImageUrl(postOption.getImageUrl()),
                post.isClosed() ? postOption.getVoteCount() : HIDDEN_COUNT,
                postOption.getVotePercent(post.getTotalVoteCount())
        );
    }

    private static String convertImageUrl(final String imageUrl) {
        return imageUrl == null ? "" : imageUrl;
    }

    public static PostOptionVoteResultResponse of(
            final PostOption postOption,
            final boolean isVisibleVoteResult,
            final Long totalVoteCount
    ) {
        return new PostOptionVoteResultResponse(
                postOption.getId(),
                postOption.getContent(),
                convertImageUrl(postOption.getImageUrl()),
                postOption.getVoteCount(isVisibleVoteResult),
                postOption.getVotePercent(totalVoteCount)
        );
    }

    public static PostOptionVoteResultResponse of(
            final Post post,
            final PostOption postOption,
            final int totalVoteCount
    ) {
        return new PostOptionVoteResultResponse(
                postOption.getId(),
                postOption.getContent(),
                handleEmptyImageUrl(postOption.getImageUrl()),
                countVotesIfPostIsOpen(post, postOption),
                calculateVotePercentIfTotalNotZero(totalVoteCount, postOption)
        );
    }

    private static String handleEmptyImageUrl(final String imageUrl) {
        if (imageUrl == null) {
            return "";
        }
        return imageUrl;
    }

    private static int countVotesIfPostIsOpen(final Post post, final PostOption postOption) {
        if (post.isClosed()) {
            return postOption.getVoteCount();
        }
        return HIDDEN_COUNT;
    }

    private static double calculateVotePercentIfTotalNotZero(final int totalCount, final PostOption postOption) {
        if (totalCount == 0) {
            return 0.0;
        }
        return ((double) postOption.getVoteCount() / totalCount);
    }

}
