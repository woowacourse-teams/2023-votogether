package com.votogether.domain.auth.service.dto;

public record TokenResponse(
        String accessToken,
        String refreshToken
) {
}
