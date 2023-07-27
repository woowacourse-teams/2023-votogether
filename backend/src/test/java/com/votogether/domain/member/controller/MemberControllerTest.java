package com.votogether.domain.member.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;

import com.votogether.domain.member.dto.MemberInfoResponse;
import com.votogether.domain.member.dto.MemberNicknameRequest;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.service.MemberService;
import com.votogether.global.jwt.TokenProcessor;
import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;

@Import(TokenProcessor.class)
@WebMvcTest(MemberController.class)
class MemberControllerTest {

    @MockBean
    MemberService memberService;

    @Autowired
    TokenProcessor tokenProcessor;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.standaloneSetup(new MemberController(memberService));
    }

    @Test
    @DisplayName("회원 정보를 조회한다.")
    void findMemberInfo() {
        // given
        MemberInfoResponse memberInfoResponse = new MemberInfoResponse(
                "저문",
                1234,
                0,
                0
        );

        given(memberService.findMemberInfo(any(Member.class))).willReturn(memberInfoResponse);

        // when
        MemberInfoResponse response = RestAssuredMockMvc
                .given().log().all()
                .when().get("/members/me")
                .then().log().all()
                .extract()
                .as(MemberInfoResponse.class);

        // then
        assertAll(
                () -> assertThat(response.nickname()).isEqualTo("저문"),
                () -> assertThat(response.point()).isEqualTo(1234),
                () -> assertThat(response.postCount()).isEqualTo(0),
                () -> assertThat(response.voteCount()).isEqualTo(0)
        );
    }

    @Nested
    @DisplayName("회원의 닉네임이")
    class ChangeNickname {

        @Test
        @DisplayName("변경에 성공하면 200을 반환한다.")
        void changeNicknameSuccess() {
            // given
            String nicknameToChange = "jeomxon";
            MemberNicknameRequest memberNicknameRequest = new MemberNicknameRequest(nicknameToChange);

            willDoNothing().given(memberService).changeNickname(any(Member.class), anyString());

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .contentType(ContentType.JSON)
                    .body(memberNicknameRequest)
                    .when().patch("/members/me/nickname")
                    .then().log().all()
                    .statusCode(HttpStatus.OK.value())
                    .extract();
        }

        @Test
        @DisplayName("변경에 실패하면 400을 반환한다.")
        void changeNicknameFail() {
            // given
            String nicknameToChange = "";
            MemberNicknameRequest memberNicknameRequest = new MemberNicknameRequest(nicknameToChange);

            willDoNothing().given(memberService).changeNickname(any(Member.class), anyString());

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .contentType(ContentType.JSON)
                    .body(memberNicknameRequest)
                    .when().patch("/members/me/nickname")
                    .then().log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .extract();
        }

    }

}
