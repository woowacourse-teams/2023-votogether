package com.votogether.domain.post.dto.response.vote;

import com.votogether.domain.post.dto.response.PostOptionResponse;
import java.util.List;

public record VoteResponse(
        long selectedOptionId,
        long totalVoteCount,
        List<PostOptionResponse> options
) {

    public static VoteResponse of(
            final long selectedOptionId,
            final long finalTotalVoteCount,
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
