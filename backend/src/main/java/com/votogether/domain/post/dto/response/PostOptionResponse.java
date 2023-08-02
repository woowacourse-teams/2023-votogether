package com.votogether.domain.post.dto.response;

import com.votogether.domain.post.entity.PostOption;

public record PostOptionResponse(
        long optionId,
        String content,
        int voteCount,
        double votePercent
) {

    public static PostOptionResponse of(
            final PostOption postOption,
            final boolean isVisibleVoteResult,
            final Long totalVoteCount
    ) {
        return new PostOptionResponse(
                postOption.getId(),
                postOption.getContent(),
                postOption.getVoteCount(isVisibleVoteResult),
                postOption.getVotePercent(totalVoteCount)
        );
    }

}
