package com.votogether.domain.post.dto.response;

import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;

public record PostOptionResponse(
        Long optionId,
        String content,
        Integer voteCount,
        Double votePercent
) {

    private static final int HIDDEN_COUNT = -1;

    public static PostOptionResponse of(final Post post, final PostOption postOption) {
        return new PostOptionResponse(
                postOption.getId(),
                postOption.getContent(),
                post.isClosed() ? postOption.getVoteCount() : HIDDEN_COUNT,
                post.isClosed() ? ((double) postOption.getVoteCount() / post.getTotalVoteCount()) * 100 : HIDDEN_COUNT
        );
    }

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
