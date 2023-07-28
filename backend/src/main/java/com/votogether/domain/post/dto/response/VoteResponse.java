package com.votogether.domain.post.dto.response;

import java.util.List;

public record VoteResponse(
        Long selectedOptionId,
        Long totalVoteCount,
        List<PostOptionResponse> options
) {

    public static VoteResponse of(
            final Long selectedOptionId,
            final Long finalTotalVoteCount,
            final List<PostOptionResponse> options
    ) {
        return new VoteResponse(selectedOptionId, finalTotalVoteCount, options);
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
