package com.votogether.domain.post.dto.response;

import java.util.List;

public record VoteResponse(
        Long selectedOptionId,
        Long totalVoteCount,
        List<PostOptionResponse> options
) {

    @Override
    public String toString() {
        return "VoteInfoResponse{" +
                "selectedOptionId=" + selectedOptionId +
                ", totalVoteCount=" + totalVoteCount +
                ", options=" + options +
                '}';
    }

}
