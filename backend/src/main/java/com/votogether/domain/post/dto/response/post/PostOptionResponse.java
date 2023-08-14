package com.votogether.domain.post.dto.response.post;

import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "게시글 선택지 정보 응답")
public record PostOptionResponse(
        @Schema(description = "게시글 선택지 ID", example = "1")
        Long optionId,

        @Schema(description = "게시글 선택지 내용", example = "짜장면")
        String content,

        @Schema(description = "이미지 URL", example = "http://sdasdas.com")
        String imageUrl,

        @Schema(description = "투표 개수", example = "4")
        Integer voteCount,

        @Schema(description = "투표한 비율", example = "50.0")
        Double votePercent
) {

    private static final int HIDDEN_COUNT = -1;

    public static PostOptionResponse of(final Post post, final PostOption postOption) {
        return new PostOptionResponse(
                postOption.getId(),
                postOption.getContent(),
                convertImageUrl(postOption.getImageUrl()),
                post.isClosed() ? postOption.getVoteCount() : HIDDEN_COUNT,
                post.isClosed() ? ((double) postOption.getVoteCount() / post.getTotalVoteCount()) * 100 : HIDDEN_COUNT
        );
    }

    private static String convertImageUrl(final String imageUrl) {
        return imageUrl == null ? "" : imageUrl;
    }

    public static PostOptionResponse of(
            final PostOption postOption,
            final boolean isVisibleVoteResult,
            final Long totalVoteCount
    ) {
        return new PostOptionResponse(
                postOption.getId(),
                postOption.getContent(),
                convertImageUrl(postOption.getImageUrl()),
                postOption.getVoteCount(isVisibleVoteResult),
                postOption.getVotePercent(totalVoteCount)
        );
    }

}
