package com.votogether.domain.auth.service;

import com.votogether.domain.auth.dto.KakaoMemberResponse;
import com.votogether.domain.auth.dto.OAuthAccessTokenResponse;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Getter
@ConfigurationProperties(prefix = "oauth.kakao")
@Component
public class KakaoOAuthClient {

    private static final RestTemplate restTemplate = new RestTemplate();

    private final MultiValueMap<String, String> info = new LinkedMultiValueMap<>();

    public String getAccessToken(final String code) {
        info.remove("code");
        info.add("code", code);

        final OAuthAccessTokenResponse response = restTemplate.postForObject(
                "https://kauth.kakao.com/oauth/token",
                info,
                OAuthAccessTokenResponse.class
        );
        return response.accessToken();
    }

    public KakaoMemberResponse getMemberInfo(final String accessToken) {
        final HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        final HttpEntity<Void> request = new HttpEntity<>(headers);

        final KakaoMemberResponse response = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.GET,
                request,
                KakaoMemberResponse.class
        ).getBody();
        return response;
    }

}
