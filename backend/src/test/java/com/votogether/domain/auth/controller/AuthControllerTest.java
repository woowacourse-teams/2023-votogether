package com.votogether.domain.auth.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.votogether.domain.auth.dto.LoginResponse;
import com.votogether.domain.auth.service.AuthService;
import com.votogether.domain.member.service.MemberService;
import com.votogether.global.jwt.TokenProcessor;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = AuthController.class)
class AuthControllerTest {

    @Autowired
    MockMvc mockMvc;

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
    void loginWithKakao() {
        // given
        String accessToken = "abcdefg";
        LoginResponse response = new LoginResponse(accessToken);

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
                () -> assertThat(responseBody).contains(accessToken)
        );
    }

}
