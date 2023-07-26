package com.votogether.domain.post.dto.response;

import com.votogether.domain.post.entity.PostOption;

public record OptionResponse(
        Long optionId,
        String content,
        Integer voteCount,
        Double votePercent
) {

    public OptionResponse(
            final PostOption postOption,
            final boolean isPostVoteByMember,
            final Long totalVoteCount
    ) {
        this(
                postOption.getId(),
                postOption.getContent(),
                postOption.getVoteCount(isPostVoteByMember),
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
