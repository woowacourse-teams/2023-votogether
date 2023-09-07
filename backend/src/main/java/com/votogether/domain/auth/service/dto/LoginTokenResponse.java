package com.votogether.domain.auth.service.dto;

public record LoginTokenResponse(
        String accessToken,
        String refreshToken,
        boolean hasEssentialInfo
) {
}
