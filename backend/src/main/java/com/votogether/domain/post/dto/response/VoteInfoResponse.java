package com.votogether.domain.post.dto.response;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import java.util.List;

public record VoteInfoResponse(
        Integer selectOption,
        Long totalVoteCount,
        List<OptionResponse> options
) {
    public VoteInfoResponse(final Post post, final Member loginMember) {
        this(
                post.getPostOptions().getSelectOption(loginMember),
                post.getFinalTotalVoteCount(loginMember),
                getOptions(post, loginMember)
        );
    }

    private static List<OptionResponse> getOptions(
            final Post post,
            final Member loginMember
    ) {
        return post.getPostOptions().getPostOptions().stream()
                .map(postOption ->
                        new OptionResponse(
                                postOption,
                                post.isPostVoteByMember(loginMember),
                                post.getFinalTotalVoteCount(loginMember)
                        )
                )
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
