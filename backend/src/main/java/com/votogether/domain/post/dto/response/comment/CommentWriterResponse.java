package com.votogether.domain.post.dto.response.comment;

import com.votogether.domain.member.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "댓글 작성자 응답")
public record CommentWriterResponse(
        @Schema(description = "댓글 작성자 ID", example = "1")
        Long id,

        @Schema(description = "댓글 작성자 닉네임", example = "votogether")
        String nickname
) {

    public static CommentWriterResponse from(final Member writer) {
        return new CommentWriterResponse(writer.getId(), writer.getNickname());
    }

}
