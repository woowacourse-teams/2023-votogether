package com.votogether.domain.member.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;

import com.votogether.domain.member.dto.MemberInfoResponse;
import com.votogether.domain.member.dto.MemberNicknameUpdateRequest;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.domain.member.service.MemberService;
import com.votogether.fixtures.MemberFixtures;
import com.votogether.global.jwt.TokenPayload;
import com.votogether.global.jwt.TokenProcessor;
import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.context.WebApplicationContext;

@WebMvcTest(MemberController.class)
class MemberControllerTest {

    @MockBean
    MemberService memberService;

    @MockBean
    TokenProcessor tokenProcessor;

    @BeforeEach
    void setUp(final WebApplicationContext webApplicationContext) {
        RestAssuredMockMvc.standaloneSetup(new MemberController(memberService));
        RestAssuredMockMvc.webAppContextSetup(webApplicationContext);
    }

    @Test
    @DisplayName("회원 정보를 조회한다.")
    void findMemberInfo() throws Exception {
        // given
        Member member = Member.builder()
                .nickname("저문")
                .gender(Gender.MALE)
                .ageRange("20~29")
                .socialId("abc123")
                .socialType(SocialType.KAKAO)
                .birthday("0101")
                .point(1234)
                .build();
        TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
        MemberInfoResponse memberInfoResponse = new MemberInfoResponse(
                "저문",
                1234,
                0,
                0
        );

        given(tokenProcessor.resolveToken(anyString())).willReturn("token");
        given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
        given(memberService.findById(anyLong())).willReturn(member);
        given(memberService.findMemberInfo(any(Member.class))).willReturn(memberInfoResponse);

        // when
        MemberInfoResponse response = RestAssuredMockMvc
                .given().log().all()
                .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
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
        void changeNicknameSuccess() throws Exception {
            // given
            String nicknameToChange = "jeomxon";
            MemberNicknameUpdateRequest memberNicknameUpdateRequest = new MemberNicknameUpdateRequest(nicknameToChange);
            TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);

            given(tokenProcessor.resolveToken(anyString())).willReturn("token");
            given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
            given(memberService.findById(anyLong())).willReturn(MemberFixtures.FEMALE_20.get());
            willDoNothing().given(memberService).changeNickname(any(Member.class), anyString());

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .contentType(ContentType.JSON)
                    .body(memberNicknameUpdateRequest)
                    .when().patch("/members/me/nickname")
                    .then().log().all()
                    .statusCode(HttpStatus.OK.value());
        }

        @Test
        @DisplayName("변경에 실패하면 400을 반환한다.")
        void changeNicknameFail() throws Exception {
            // given
            String nicknameToChange = "";
            MemberNicknameUpdateRequest memberNicknameUpdateRequest = new MemberNicknameUpdateRequest(nicknameToChange);
            TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);

            given(tokenProcessor.resolveToken(anyString())).willReturn("token");
            given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
            given(memberService.findById(anyLong())).willReturn(MemberFixtures.FEMALE_20.get());
            willDoNothing().given(memberService).changeNickname(any(Member.class), anyString());

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .contentType(ContentType.JSON)
                    .body(memberNicknameUpdateRequest)
                    .when().patch("/members/me/nickname")
                    .then().log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value());
        }

    }

    @Test
    @DisplayName("회원 탈퇴에 성공하면 204를 반환한다.")
    void deleteMember() throws Exception {
        // given
        TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);

        given(tokenProcessor.resolveToken(anyString())).willReturn("token");
        given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
        given(memberService.findById(anyLong())).willReturn(MemberFixtures.FEMALE_20.get());
        willDoNothing().given(memberService).deleteMember(MemberFixtures.FEMALE_20.get());

        // when, then
        RestAssuredMockMvc
                .given().log().all()
                .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                .when().delete("/members/me/delete")
                .then().log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }

}
