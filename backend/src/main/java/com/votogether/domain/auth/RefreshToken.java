package com.votogether.domain.auth;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "refreshToken", timeToLive = 1209600)
public record RefreshToken(
        @Id
        String refreshToken,

        Long memberId
) {
}
