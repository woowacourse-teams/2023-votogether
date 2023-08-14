package com.votogether.domain.auth.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "카카오 서버로부터 받은 유저 정보")
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public record KakaoMemberResponse(
        @Schema(description = "카카오 소셜 ID", example = "1")
        Long id,

        @Schema(description = "카카오 유저 정보")
        KakaoAccount kakaoAccount
) {

    @Schema(description = "카카오 유저 정보")
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public record KakaoAccount(
            @Schema(description = "이메일", example = "votogether@email.com")
            String email
    ) {
    }

}
