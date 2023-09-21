package com.votogether.domain.post.dto.request.comment;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "댓글 작성 요청")
public record CommentCreateRequest(
        @Schema(description = "댓글 내용", example = "hello")
        @NotBlank(message = "댓글 내용은 존재해야 합니다.")
        String content
) {
}
