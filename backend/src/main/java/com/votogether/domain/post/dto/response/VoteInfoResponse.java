package com.votogether.domain.post.dto.response;

import java.util.List;

public record VoteInfoResponse(
        Integer selectOption,
        Long totalVoteCount,
        List<PostOptionResponse> options
) {

    @Override
    public String toString() {
        return "VoteInfoResponse{" +
                "selectOption=" + selectOption +
                ", totalVoteCount=" + totalVoteCount +
                ", options=" + options +
                '}';
    }

}
