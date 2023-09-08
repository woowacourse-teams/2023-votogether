package com.votogether.domain.post.dto.response.post;

public record PostRankingResponse(
        PostCompactResponse postCompactResponse,
        int ranking
) {
}
