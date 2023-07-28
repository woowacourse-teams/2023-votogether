package com.votogether.domain.post.dto.response;

import com.votogether.domain.post.entity.PostOption;

public record PostOptionResponse(
        Long optionId,
        String content,
        Integer voteCount,
        Double votePercent
) {

    public PostOptionResponse(
            final PostOption postOption,
            final Boolean isVisibleVoteResult,
            final Long totalVoteCount
    ) {
        this(
                postOption.getId(),
                postOption.getContent(),
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
