package com.votogether.domain.auth.service.oauth;

import com.votogether.domain.auth.dto.response.KakaoMemberResponse;
import com.votogether.domain.auth.dto.response.OAuthAccessTokenResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Getter
@RequiredArgsConstructor
@Component
public class KakaoOAuthClient {

    private static final RestTemplate restTemplate = new RestTemplate();

    private final KakaoOAuthConfig kakaoOAuthConfig;

    public String getAccessToken(final String code) {
        final MultiValueMap<String, String> info = makeKakaoInfo(code);
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        final HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(info, headers);

        final OAuthAccessTokenResponse response = restTemplate.postForEntity(
                "https://kauth.kakao.com/oauth/token",
                httpEntity,
                OAuthAccessTokenResponse.class
        ).getBody();
        return response.accessToken();
    }

    private MultiValueMap<String, String> makeKakaoInfo(final String code) {
        final MultiValueMap<String, String> info = new LinkedMultiValueMap<>();
        info.add("grant_type", kakaoOAuthConfig.grantType());
        info.add("client_id", kakaoOAuthConfig.clientId());
        info.add("client_secret", kakaoOAuthConfig.clientSecret());
        info.add("redirect_uri", kakaoOAuthConfig.redirectUri());
        info.add("code", code);
        return info;
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
