package com.votogether.domain.post.dto.response.post;

import com.votogether.domain.post.entity.Post;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "게시글 정보 응답")
public record PostCompactResponse(
        @Schema(description = "게시글 ID", example = "1")
        Long id,

        @Schema(description = "작성자", example = "익명의손님1")
        String writer,

        @Schema(description = "게시글 제목", example = "제목")
        String title,

        @Schema(description = "투표 수", example = "123")
        long voteCount
) {

    public static PostCompactResponse of(final Post post) {
        return new PostCompactResponse(
                post.getId(),
                post.getWriter().getNickname(),
                post.getPostBody().getTitle(),
                post.getTotalVoteCount()
        );
    }

}
