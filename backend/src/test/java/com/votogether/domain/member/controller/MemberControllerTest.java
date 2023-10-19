package com.votogether.domain.member.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;

import com.votogether.domain.member.dto.request.MemberDetailRequest;
import com.votogether.domain.member.dto.request.MemberNicknameUpdateRequest;
import com.votogether.domain.member.dto.response.MemberInfoResponse;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.vo.Gender;
import com.votogether.domain.member.entity.vo.Roles;
import com.votogether.domain.member.entity.vo.SocialType;
import com.votogether.global.jwt.TokenPayload;
import com.votogether.test.ControllerTest;
import com.votogether.test.fixtures.MemberFixtures;
import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

@WebMvcTest(MemberController.class)
class MemberControllerTest extends ControllerTest {

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.standaloneSetup(new MemberController(memberService));
    }

    @Test
    @DisplayName("회원 정보를 조회한다.")
    void findMemberInfo() throws Exception {
        // given
        Member member = Member.builder()
                .nickname("저문")
                .gender(Gender.MALE)
                .birthYear(2000)
                .socialId("abc123")
                .socialType(SocialType.KAKAO)
                .build();
        TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
        MemberInfoResponse memberInfoResponse = new MemberInfoResponse(
                "저문",
                Gender.MALE,
                1988,
                0,
                0,
                Roles.MEMBER,
                false
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
                () -> assertThat(response.postCount()).isZero(),
                () -> assertThat(response.voteCount()).isZero()
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

    @Nested
    @DisplayName("회원 정보 수정을 할 때")
    class UpdateDetails {

        @Test
        @DisplayName("요청이 정상적이라면 성공한다.")
        void updateDetails() throws Exception {
            // given
            Member member = MemberFixtures.MALE_20.get();
            MemberDetailRequest request = new MemberDetailRequest(Gender.MALE, 2000);

            TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
            given(tokenProcessor.resolveToken(anyString())).willReturn("token");
            given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
            given(memberService.findById(anyLong())).willReturn(MemberFixtures.FEMALE_20.get());

            willDoNothing().given(memberService).updateDetails(request, member);

            // when
            RestAssuredMockMvc
                    .given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .contentType(ContentType.JSON)
                    .body(request)
                    .when().patch("/members/me/detail")
                    .then().log().all()
                    .statusCode(HttpStatus.OK.value());
        }

        @ParameterizedTest
        @ValueSource(ints = {1, 222, 55555})
        @DisplayName("유효하지 않은 출생년도라면 400을 반환한다.")
        void invalidRangeOfBirthYear(int birthYear) throws Exception {
            // given
            Member member = MemberFixtures.MALE_20.get();
            MemberDetailRequest request = new MemberDetailRequest(Gender.MALE, birthYear);

            TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
            given(tokenProcessor.resolveToken(anyString())).willReturn("token");
            given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
            given(memberService.findById(anyLong())).willReturn(MemberFixtures.FEMALE_20.get());

            willDoNothing().given(memberService).updateDetails(request, member);

            // when
            RestAssuredMockMvc
                    .given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .contentType(ContentType.JSON)
                    .body(request)
                    .when().patch("/members/me/detail")
                    .then().log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value());
        }

        @ParameterizedTest
        @NullSource
        @DisplayName("출생년도가 빈 값이면 400을 반환한다.")
        void invalidNullOfBirthYear(Integer birthYear) throws Exception {
            // given
            Member member = MemberFixtures.MALE_20.get();
            MemberDetailRequest request = new MemberDetailRequest(Gender.MALE, birthYear);

            TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
            given(tokenProcessor.resolveToken(anyString())).willReturn("token");
            given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
            given(memberService.findById(anyLong())).willReturn(MemberFixtures.FEMALE_20.get());

            willDoNothing().given(memberService).updateDetails(request, member);

            // when
            RestAssuredMockMvc
                    .given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .contentType(ContentType.JSON)
                    .body(request)
                    .when().patch("/members/me/detail")
                    .then().log().all()
                    .statusCode(HttpStatus.BAD_REQUEST.value());
        }

    }

    @Test
    @DisplayName("최신 알림 읽기에 성공하면 200을 반환한다.")
    void checkLatestAlarm() throws Exception {
        // given
        TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
        given(tokenProcessor.resolveToken(anyString())).willReturn("token");
        given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
        given(memberService.findById(anyLong())).willReturn(MemberFixtures.FEMALE_20.get());

        willDoNothing().given(memberService).checkLatestAlarm(any(Member.class));

        // when, then
        RestAssuredMockMvc
                .given().log().all()
                .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                .when().patch("/members/me/check-alarm")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
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
