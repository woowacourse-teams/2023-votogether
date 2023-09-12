package com.votogether.domain.auth.service.dto;

public record LoginTokenDto(
        String accessToken,
        String refreshToken,
        boolean hasEssentialInfo
) {
}
