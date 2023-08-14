package com.votogether.domain.post.dto.response.vote;

import com.votogether.domain.post.dto.response.post.PostOptionDetailResponse;
import java.util.List;

public record VoteDetailResponse(
        Long selectedOptionId,
        Long totalVoteCount,
        List<PostOptionDetailResponse> options
) {

    public static VoteDetailResponse of(
            final long selectedOptionId,
            final long finalTotalVoteCount,
            final List<PostOptionDetailResponse> options
    ) {
        return new VoteDetailResponse(selectedOptionId, finalTotalVoteCount, options);
    }

}
