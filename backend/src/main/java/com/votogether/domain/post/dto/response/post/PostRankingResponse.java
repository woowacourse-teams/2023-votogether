package com.votogether.domain.post.dto.response.post;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "게시글 랭킹 정보 응답")
public record PostRankingResponse(
        @Schema(description = "게시글 랭킹", example = "1")
        int ranking,

        @Schema(description = "게시글 정보")
        @JsonProperty("post")
        PostSummaryResponse postSummaryResponse
) {
}
