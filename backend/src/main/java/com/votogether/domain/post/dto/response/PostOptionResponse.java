package com.votogether.domain.post.dto.response;

import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;

public record PostOptionResponse(
        Long optionId,
        String content,
        String imageUrl,
        Integer voteCount,
        Double votePercent
) {

    private static final int HIDDEN_COUNT = -1;

    public static PostOptionResponse of(final Post post, final PostOption postOption) {
        return new PostOptionResponse(
                postOption.getId(),
                postOption.getContent(),
                convertImageUrl(postOption.getImageUrl()),
                post.isClosed() ? postOption.getVoteCount() : HIDDEN_COUNT,
                post.isClosed() ? ((double) postOption.getVoteCount() / post.getTotalVoteCount()) * 100 : HIDDEN_COUNT
        );
    }

    private static String convertImageUrl(final String imageUrl) {
        return imageUrl == null ? "" : imageUrl;
    }

    public static PostOptionResponse of(
            final PostOption postOption,
            final boolean isVisibleVoteResult,
            final Long totalVoteCount
    ) {
        return new PostOptionResponse(
                postOption.getId(),
                postOption.getContent(),
                convertImageUrl(postOption.getImageUrl()),
                postOption.getVoteCount(isVisibleVoteResult),
                postOption.getVotePercent(totalVoteCount)
        );
    }

}
