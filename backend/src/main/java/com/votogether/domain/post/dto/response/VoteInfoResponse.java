package com.votogether.domain.post.dto.response;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.entity.PostOptions;
import java.util.List;
import java.util.Objects;

public record VoteInfoResponse(
        Integer selectOption,
        Long totalVoteCount,
        List<OptionResponse> options
) {
    public VoteInfoResponse(
            final Member member,
            final PostOptions postOptions,
            final Long totalVoteCount
    ) {
        this(
                getSelectOption(member, postOptions),
                parseTotalVoteCount(totalVoteCount),
                getOptions(postOptions, parseTotalVoteCount(totalVoteCount))
        );
    }

    private static Integer getSelectOption(final Member member, final PostOptions postOptions) {
        return postOptions.getPostOptions().stream()
                .filter(postOption -> postOption.isVoteByMember(member))
                .findFirst()
                .map(PostOption::getSequence)
                .orElse(0);
    }

    private static Long parseTotalVoteCount(final Long totalVoteCount) {
        if (Objects.isNull(totalVoteCount) || totalVoteCount == 0) {
            return -1L;
        }

        return totalVoteCount;
    }

    private static List<OptionResponse> getOptions(final PostOptions postOptions, final Long totalVoteCount) {
        return postOptions.getPostOptions().stream()
                .map(postOption -> new OptionResponse(postOption, totalVoteCount))
                .toList();
    }

    @Override
    public String toString() {
        return "VoteInfoResponse{" +
                "selectOption=" + selectOption +
                ", totalVoteCount=" + totalVoteCount +
                ", options=" + options +
                '}';
    }

}
