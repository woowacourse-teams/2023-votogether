package com.votogether.domain.auth.service.dto;

public record ReissuedTokenDto(
        String accessToken,
        String refreshToken
) {
}
