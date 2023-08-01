package com.votogether.domain.post.dto.response.detail;

import com.votogether.domain.post.entity.PostOption;

public record PostOptionDetailResponse(
        long optionId,
        String content,
        String imageUrl,
        int voteCount,
        double votePercent
) {

    public static PostOptionDetailResponse of(
            final PostOption postOption,
            final boolean isVisibleVoteResult,
            final Long totalVoteCount
    ) {
        return new PostOptionDetailResponse(
                postOption.getId(),
                postOption.getContent(),
                postOption.getImageUrl(),
                postOption.getVoteCount(isVisibleVoteResult),
                postOption.getVotePercent(totalVoteCount)
        );
    }

    @Override
    public String toString() {
        return "OptionResponse{" +
                "optionId=" + optionId +
                ", content='" + content + '\'' +
                ", voteCount=" + voteCount +
                ", votePercent=" + votePercent +
                '}';
    }

}
