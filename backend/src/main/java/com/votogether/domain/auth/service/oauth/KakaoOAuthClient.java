package com.votogether.domain.auth.service.oauth;

import com.votogether.domain.auth.dto.response.KakaoMemberResponse;
import com.votogether.domain.auth.dto.response.OAuthAccessTokenResponse;
import com.votogether.domain.auth.dto.response.OAuthDisconnectResponse;
import com.votogether.domain.member.entity.Member;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Getter
@Component
public class KakaoOAuthClient {

    private static final RestTemplate restTemplate = new RestTemplate();

    private final KakaoOAuthLoginInfo kakaoOAuthLoginInfo;

    private final String appAdminKey;

    public KakaoOAuthClient(
            final KakaoOAuthLoginInfo kakaoOAuthLoginInfo,
            @Value("${oauth.kakao.disconnect.admin-key}") final String appAdminKey
    ) {
        this.kakaoOAuthLoginInfo = kakaoOAuthLoginInfo;
        this.appAdminKey = appAdminKey;
    }

    public String getAccessToken(final String code) {
        final MultiValueMap<String, String> loginInfoRequest = makeKakaoLoginInfo(code);
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        final HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(loginInfoRequest, headers);

        final OAuthAccessTokenResponse response = restTemplate.postForEntity(
                "https://kauth.kakao.com/oauth/token",
                httpEntity,
                OAuthAccessTokenResponse.class
        ).getBody();
        return response.accessToken();
    }

    private MultiValueMap<String, String> makeKakaoLoginInfo(final String code) {
        final MultiValueMap<String, String> loginInfoRequest = new LinkedMultiValueMap<>();
        loginInfoRequest.add("grant_type", kakaoOAuthLoginInfo.grantType());
        loginInfoRequest.add("client_id", kakaoOAuthLoginInfo.clientId());
        loginInfoRequest.add("client_secret", kakaoOAuthLoginInfo.clientSecret());
        loginInfoRequest.add("redirect_uri", kakaoOAuthLoginInfo.redirectUri());
        loginInfoRequest.add("code", code);
        return loginInfoRequest;
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

    public OAuthDisconnectResponse disconnectFromKakao(final Member member) {
        final HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, "KakaoAK " + appAdminKey);

        final MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("target_id_type", "user_id");
        requestBody.add("target_id", member.getSocialId());

        final HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(requestBody, headers);

        final OAuthDisconnectResponse response = restTemplate.postForEntity(
                "https://kapi.kakao.com/v1/user/unlink",
                request,
                OAuthDisconnectResponse.class
        ).getBody();
        return response;
    }

}
