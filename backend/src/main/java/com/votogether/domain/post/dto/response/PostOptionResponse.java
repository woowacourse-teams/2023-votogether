package com.votogether.domain.post.dto.response;

import com.votogether.domain.post.entity.PostOption;

public record PostOptionResponse(
        Long optionId,
        String content,
        Integer voteCount,
        Double votePercent
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
