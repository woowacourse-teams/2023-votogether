package com.votogether.domain.ranking.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "랭킹 정보 응답")
public record RankingResponse(
        @Schema(description = "랭킹", example = "2")
        long ranking,

        @Schema(description = "닉네임", example = "유저")
        String nickname,

        @Schema(description = "게시글 수", example = "5")
        long postCount,

        @Schema(description = "투표 수", example = "6")
        long voteCount,

        @Schema(description = "점수", example = "31")
        long score
) {
}

