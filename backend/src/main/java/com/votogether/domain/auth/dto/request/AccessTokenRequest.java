package com.votogether.domain.auth.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "인증 토큰 재발급 요청")
public record AccessTokenRequest(
        @Schema(description = "인증 토큰", example = "abc.def.ghi")
        @NotBlank(message = "인증 토큰은 빈 값이거나 null이 될 수 없습니다.")
        String accessToken
) {
}
