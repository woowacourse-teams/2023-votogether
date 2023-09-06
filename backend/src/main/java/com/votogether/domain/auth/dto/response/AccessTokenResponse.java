package com.votogether.domain.auth.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "액세스 토큰 재발급 응답")
public record AccessTokenResponse(
        String accessToken
) {
}
