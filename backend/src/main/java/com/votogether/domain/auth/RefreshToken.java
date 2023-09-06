package com.votogether.domain.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@RedisHash(value = "refreshToken", timeToLive = 1209600)
public class RefreshToken {

    @Id
    private String refreshToken;
    private Long memberId;

}
