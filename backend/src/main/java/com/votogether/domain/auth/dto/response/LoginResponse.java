package com.votogether.domain.auth.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "로그인 응답")
public record LoginResponse(
        @Schema(description = "인증 토큰", example = "abc.def.ghi")
        String accessToken,

        @Schema(description = "성별, 나이대 정보를 가지고 있는지 여부", example = "true")
        boolean hasEssentialInfo
) {
}
