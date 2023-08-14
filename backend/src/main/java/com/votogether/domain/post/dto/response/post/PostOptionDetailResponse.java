package com.votogether.domain.post.dto.response.post;

import com.votogether.domain.post.entity.PostOption;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "게시글 선택지 정보 응답")
public record PostOptionDetailResponse(
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

    public static PostOptionDetailResponse of(
            final PostOption postOption,
            final Boolean isVisibleVoteResult,
            final Long totalVoteCount
    ) {
        return new PostOptionDetailResponse(
                postOption.getId(),
                postOption.getContent(),
                postOption.getImageUrl(),
                postOption.getVoteCount(isVisibleVoteResult),
                postOption.getVotePercent(totalVoteCount)
        );
    }

}
