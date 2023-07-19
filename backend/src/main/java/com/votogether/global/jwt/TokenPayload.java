package com.votogether.global.jwt;

public record TokenPayload(
        Long memberId,
        Long issuedAt,
        Long expiration
) {
}
