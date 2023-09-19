package com.votogether.domain.auth.service.dto;

import com.votogether.global.jwt.TokenPayload;

public record TokenPayloadDto(
        TokenPayload accessTokenPayload,
        TokenPayload refreshTokenPayload
) {
}
