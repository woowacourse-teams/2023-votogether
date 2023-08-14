package com.votogether.domain.post.dto.response.vote;

import com.votogether.domain.post.dto.response.post.PostOptionResponse;
import com.votogether.domain.post.entity.Post;
import java.util.List;

public record VoteResponse(
        long selectedOptionId,
        long totalVoteCount,
        List<PostOptionResponse> options
) {

    private static final int NOT_SELECTED = 0;
    private static final int HIDDEN_COUNT = -1;

    public static VoteResponse of(
            final long selectedOptionId,
            final long finalTotalVoteCount,
            final List<PostOptionResponse> options
    ) {
        return new VoteResponse(selectedOptionId, finalTotalVoteCount, options);
    }

    public static VoteResponse forGuest(final Post post) {
        return new VoteResponse(
                NOT_SELECTED,
                post.isClosed() ? post.getTotalVoteCount() : HIDDEN_COUNT,
                listOfOptionsForGuest(post)
        );
    }

    private static List<PostOptionResponse> listOfOptionsForGuest(final Post post) {
        return post.getPostOptions().getPostOptions()
                .stream()
                .map(postOption -> PostOptionResponse.of(post, postOption))
                .toList();
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
