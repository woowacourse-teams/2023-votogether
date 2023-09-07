package com.votogether.domain.auth.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "인증 토큰 재발급 요청")
public record AccessTokenRequest(
        @Schema(description = "인증 토큰", example = "abc.def.ghi")
        String accessToken
) {
}
