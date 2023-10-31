package com.votogether.domain.auth.service.oauth;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "oauth.kakao")
public record KakaoOAuthConfig(
        String grantType,
        String clientId,
        String clientSecret,
        String redirectUri
) {
}
