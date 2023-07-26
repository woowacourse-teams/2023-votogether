package com.votogether.domain.post.dto.request;

import jakarta.validation.constraints.NotBlank;

public record CommentRegisterRequest(@NotBlank(message = "댓글 내용은 존재해야 합니다.") String content) {
}
