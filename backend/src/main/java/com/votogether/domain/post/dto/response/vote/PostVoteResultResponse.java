package com.votogether.domain.post.dto.response.vote;

import com.votogether.domain.post.dto.response.post.PostOptionVoteResultResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "게시글 투표 결과 응답")
public record PostVoteResultResponse(
        @Schema(description = "선택한 투표 옵션 ID", example = "1")
        Long selectedOptionId,

        @Schema(description = "게시글 총 투표 수", example = "7")
        long totalVoteCount,

        @Schema(description = "투표 옵션 투표 결과 목록")
        List<PostOptionVoteResultResponse> options
) {

    private static final Long NOT_SELECTED = 0L;
    private static final int HIDDEN_COUNT = -1;

    public static PostVoteResultResponse of(
            final long selectedOptionId,
            final long finalTotalVoteCount,
            final List<PostOptionVoteResultResponse> options
    ) {
        return new PostVoteResultResponse(selectedOptionId, finalTotalVoteCount, options);
    }

    public static PostVoteResultResponse ofGuest(final Post post) {
        return new PostVoteResultResponse(
                NOT_SELECTED,
                post.isClosed() ? post.getTotalVoteCount() : HIDDEN_COUNT,
                listOfOptionsForGuest(post)
        );
    }

    private static List<PostOptionVoteResultResponse> listOfOptionsForGuest(final Post post) {
        return post.getPostOptions().getPostOptions()
                .stream()
                .map(postOption -> PostOptionVoteResultResponse.of(post, postOption))
                .toList();
    }

    public static PostVoteResultResponse ofGuest(final Post post, final List<PostOption> postOptions) {
        final int totalVoteCount = postOptions.stream()
                .mapToInt(PostOption::getVoteCount)
                .sum();
        return new PostVoteResultResponse(
                NOT_SELECTED,
                countVotesIfPostIsOpen(post, totalVoteCount),
                convertToResponses(post, postOptions, totalVoteCount)
        );
    }

    private static int countVotesIfPostIsOpen(final Post post, final int totalVoteCount) {
        if (post.isClosed()) {
            return totalVoteCount;
        }
        return HIDDEN_COUNT;
    }

    private static List<PostOptionVoteResultResponse> convertToResponses(
            final Post post,
            final List<PostOption> postOptions,
            final int totalVoteCount
    ) {
        return postOptions.stream()
                .map(postOption -> PostOptionVoteResultResponse.of(post, postOption, totalVoteCount))
                .toList();
    }

}
