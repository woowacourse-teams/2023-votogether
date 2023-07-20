package com.votogether.domain.post.dto.response;

import com.votogether.domain.post.entity.PostOption;

public record OptionResponse(
        Long optionId,
        String content,
        Integer voteCount,
        Double votePercent
) {

    public OptionResponse(final PostOption postOption, final Long totalVoteCount) {
        this(
                postOption.getId(),
                postOption.getContent(),
                getVoteCount(postOption),
                getVotePercent(postOption, totalVoteCount)
        );
    }

    private static Integer getVoteCount(final PostOption postOption) {
        final int voteCount = postOption.getVotes().size();
        if (voteCount == 0) {
            return -1;
        }

        return voteCount;
    }

    private static Double getVotePercent(final PostOption postOption, final Long totalVoteCount) {
        final Double votePercent = calculateVotePercent(postOption, totalVoteCount);
        if (votePercent == 0) {
            return -1.0;
        }

        return votePercent;
    }

    private static Double calculateVotePercent(final PostOption postOption, final Long totalVoteCount) {
        return ((double) postOption.getVotes().size() / totalVoteCount) * 100;
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
