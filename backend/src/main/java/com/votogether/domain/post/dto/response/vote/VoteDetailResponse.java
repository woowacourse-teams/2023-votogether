package com.votogether.domain.post.dto.response.vote;

import com.votogether.domain.post.dto.response.post.PostOptionDetailResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "투표 상세 응답")
public record VoteDetailResponse(
        @Schema(description = "선택지 ID", example = "1")
        Long selectedOptionId,

        @Schema(description = "총 투표 수", example = "2")
        Long totalVoteCount,

        @Schema(description = "선택지 상세 응답")
        List<PostOptionDetailResponse> options
) {

    public static VoteDetailResponse of(
            final long selectedOptionId,
            final long finalTotalVoteCount,
            final List<PostOptionDetailResponse> options
    ) {
        return new VoteDetailResponse(selectedOptionId, finalTotalVoteCount, options);
    }

}
