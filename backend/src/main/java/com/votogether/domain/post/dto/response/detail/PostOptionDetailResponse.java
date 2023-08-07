package com.votogether.domain.post.dto.response.detail;

import com.votogether.domain.post.entity.PostOption;

public record PostOptionDetailResponse(
        Long optionId,
        String content,
        String imageUrl,
        Integer voteCount,
        Double votePercent
) {

    public static PostOptionDetailResponse of(
            final PostOption postOption,
            final Boolean isVisibleVoteResult,
            final Long totalVoteCount
    ) {
        return new PostOptionDetailResponse(
                postOption.getId(),
                postOption.getContent(),
                convertImageUrl(postOption.getImageUrl()),
                postOption.getVoteCount(isVisibleVoteResult),
                postOption.getVotePercent(totalVoteCount)
        );
    }

    private static String convertImageUrl(final String imageUrl) {
        return imageUrl.contains("없는사진") ? "" : imageUrl;
    }

}
