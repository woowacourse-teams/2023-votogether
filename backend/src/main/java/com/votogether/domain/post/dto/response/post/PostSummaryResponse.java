package com.votogether.domain.post.dto.response.post;

import com.votogether.domain.post.entity.Post;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "게시글 간략 정보 응답")
public record PostSummaryResponse(
        @Schema(description = "게시글 ID", example = "1")
        Long id,

        @Schema(description = "작성자", example = "익명의손님1")
        String writer,

        @Schema(description = "게시글 제목", example = "제목")
        String title,

        @Schema(description = "투표 수", example = "123")
        long voteCount
) {

    public static PostSummaryResponse from(final Post post) {
        return new PostSummaryResponse(
                post.getId(),
                post.getWriter().getNickname(),
                post.getPostBody().getTitle(),
                post.getVoteCount()
        );
    }

}
