package com.votogether.domain.post.dto.response.vote;

import com.votogether.domain.post.dto.response.post.PostOptionResponse;
import com.votogether.domain.post.entity.Post;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;


@Schema(description = "투표 응답")
public record VoteResponse(
        @Schema(description = "선택지 ID", example = "1")
        long selectedOptionId,

        @Schema(description = "총 투표 수", example = "7")
        long totalVoteCount,

        @Schema(description = "선택지 옵션 응답")
        List<PostOptionResponse> options
) {

    private static final int NOT_SELECTED = 0;
    private static final int HIDDEN_COUNT = -1;

    public static VoteResponse of(
            final long selectedOptionId,
            final long finalTotalVoteCount,
            final List<PostOptionResponse> options
    ) {
        return new VoteResponse(selectedOptionId, finalTotalVoteCount, options);
    }

    public static VoteResponse forGuest(final Post post) {
        return new VoteResponse(
                NOT_SELECTED,
                post.isClosed() ? post.getTotalVoteCount() : HIDDEN_COUNT,
                listOfOptionsForGuest(post)
        );
    }

    private static List<PostOptionResponse> listOfOptionsForGuest(final Post post) {
        return post.getPostOptions().getPostOptions()
                .stream()
                .map(postOption -> PostOptionResponse.of(post, postOption))
                .toList();
    }

    @Override
    public String toString() {
        return "VoteInfoResponse{" +
                "selectedOptionId=" + selectedOptionId +
                ", totalVoteCount=" + totalVoteCount +
                ", options=" + options +
                '}';
    }

}
