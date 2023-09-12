package com.votogether.domain.auth.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "카카오 서버로부터 발급받는 토큰 정보")
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public record OAuthAccessTokenResponse(
        @Schema(description = "토큰 타입", example = "bearer")
        String tokenType,

        @Schema(description = "인증 토큰", example = "abc.def.ghi")
        String accessToken,

        @Schema(description = "인증 토큰 만료 시간", example = "10")
        Integer expiresIn,

        @Schema(description = "갱신 토큰", example = "abc.def.ghi")
        String refreshToken,

        @Schema(description = "갱신 토큰 만료 시간", example = "10")
        Integer refreshTokenExpiresIn
) {
}
