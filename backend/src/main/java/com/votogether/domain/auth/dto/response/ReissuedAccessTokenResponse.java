package com.votogether.domain.auth.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "인증 토큰 재발급 응답")
public record ReissuedAccessTokenResponse(
        @Schema(description = "인증 토큰", example = "abc.def.ghi")
        String accessToken
) {
}
