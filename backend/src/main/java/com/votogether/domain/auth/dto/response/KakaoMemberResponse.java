package com.votogether.domain.auth.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public record KakaoMemberResponse(
        Long id,
        KakaoAccount kakaoAccount
) {

    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public record KakaoAccount(
            String email
    ) {
    }

}
