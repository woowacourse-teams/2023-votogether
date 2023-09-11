package com.votogether.domain.auth.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;

import com.votogether.domain.auth.dto.request.AccessTokenRequest;
import com.votogether.domain.auth.dto.response.ReissuedAccessTokenResponse;
import com.votogether.domain.auth.service.AuthService;
import com.votogether.domain.auth.service.dto.LoginTokenResponse;
import com.votogether.domain.auth.service.dto.TokenResponse;
import com.votogether.domain.member.service.MemberService;
import com.votogether.global.jwt.TokenProcessor;
import io.restassured.http.Cookie;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

@WebMvcTest(controllers = AuthController.class)
class AuthControllerTest {

    @MockBean
    AuthService authService;

    @MockBean
    TokenProcessor tokenProcessor;

    @MockBean
    MemberService memberService;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.standaloneSetup(new AuthController(authService));
    }

    @Test
    @DisplayName("카카오 로그인을 한다.")
    void loginByKakao() {
        // given
        String accessToken = "abcdefg";
        String refreshToken = "adfdsfdsa";
        LoginTokenResponse response = new LoginTokenResponse(accessToken, refreshToken, false);

        given(authService.register(any())).willReturn(response);

        // when
        String responseBody = RestAssuredMockMvc
                .given().log().all()
                .queryParam("code", "abc1234")
                .when().get("/auth/kakao/callback")
                .then().log().all()
                .status(HttpStatus.OK)
                .extract()
                .asString();

        // then
        assertAll(
                () -> assertThat(responseBody).contains("accessToken"),
                () -> assertThat(responseBody).contains(accessToken),
                () -> assertThat(responseBody).contains("hasEssentialInfo"),
                () -> assertThat(responseBody).contains("false")
        );
    }

    @Test
    @DisplayName("인증 토큰을 재발급한다.")
    void reissueAccessToken() throws Exception {
        // given
        String accessToken = "abcdefg";
        String refreshToken = "adfdsfdsa";
        AccessTokenRequest request = new AccessTokenRequest(accessToken);
        TokenResponse tokenResponse = new TokenResponse(accessToken, refreshToken);
        Cookie cookie = new Cookie.Builder("refreshToken", refreshToken).build();

        given(authService.reissueAuthToken(any(AccessTokenRequest.class), anyString())).willReturn(tokenResponse);

        // when
        ReissuedAccessTokenResponse response = RestAssuredMockMvc
                .given().log().all()
                .cookie(cookie)
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .when().post("/auth/silent-login")
                .then().log().all()
                .status(HttpStatus.OK)
                .cookie("refreshToken", tokenResponse.refreshToken())
                .extract()
                .as(ReissuedAccessTokenResponse.class);

        // then
        assertThat(response.accessToken()).isEqualTo(tokenResponse.accessToken());
    }

    @Test
    @DisplayName("로그아웃을 한다.")
    void logout() {
        // given
        String refreshToken = "adfdsfdsa";
        final Cookie cookie = new Cookie.Builder("refreshToken", refreshToken).build();

        willDoNothing().given(authService).deleteRefreshToken(refreshToken);

        // when
        RestAssuredMockMvc
                .given().log().all()
                .cookie(cookie)
                .when().delete("/auth/logout")
                .then().log().all()
                .header("Set-Cookie", containsString("Max-Age=0"))
                .status(HttpStatus.NO_CONTENT);
    }

}
