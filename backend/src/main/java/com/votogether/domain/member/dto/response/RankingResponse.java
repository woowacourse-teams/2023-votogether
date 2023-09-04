package com.votogether.domain.member.dto.response;

public record RankingResponse(
        int ranking,
        String nickname,
        int postCount,
        int voteCount,
        int score
) {
}

