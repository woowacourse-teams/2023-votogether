package com.votogether.domain.post.dto.response;

import java.util.List;

public record VoteDetailResponse(
        long selectedOptionId,
        long totalVoteCount,
        List<PostOptionDetailResponse> options
) {

    public static VoteDetailResponse of(
            final long selectedOptionId,
            final long finalTotalVoteCount,
            final List<PostOptionDetailResponse> options
    ) {
        return new VoteDetailResponse(selectedOptionId, finalTotalVoteCount, options);
    }

    @Override
    public String toString() {
        return "VoteInfoResponse{" +
                "selectedOptionId=" + selectedOptionId +
                ", totalVoteCount=" + totalVoteCount +
                ", options=" + options +
                '}';
    }

}
