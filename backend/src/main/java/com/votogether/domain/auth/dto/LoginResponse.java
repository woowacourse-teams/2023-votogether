package com.votogether.domain.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "로그인 응답")
public record LoginResponse(
        @Schema(description = "인증 토큰", example = "A1B2C3D4")
        String accessToken
) {
}
