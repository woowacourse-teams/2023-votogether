package com.votogether.domain.report.controller;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;

import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.domain.member.service.MemberService;
import com.votogether.domain.report.dto.ReportRequest;
import com.votogether.domain.report.entity.ReportType;
import com.votogether.domain.report.service.ReportService;
import com.votogether.global.jwt.TokenPayload;
import com.votogether.global.jwt.TokenProcessor;
import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.NullSource;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.context.WebApplicationContext;

@WebMvcTest(ReportController.class)
class ReportControllerTest {

    @MockBean
    ReportService reportService;

    @MockBean
    TokenProcessor tokenProcessor;

    @MockBean
    MemberService memberService;

    @BeforeEach
    void setUp(final WebApplicationContext webApplicationContext) {
        RestAssuredMockMvc.standaloneSetup(new ReportController(reportService));
        RestAssuredMockMvc.webAppContextSetup(webApplicationContext);
    }

    @Nested
    @DisplayName("신고 기능은 ")
    class Report {

        @Test
        @DisplayName("게시글에 대해 정상적으로 작동한다.")
        void reportPost() throws Exception {
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
            given(tokenProcessor.resolveToken(anyString())).willReturn("token");
            given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
            given(memberService.findById(anyLong())).willReturn(member);

            ReportRequest request = new ReportRequest(ReportType.POST, 1L, "불건전한 게시글");
            willDoNothing().given(reportService).report(member, request);

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .contentType(ContentType.JSON)
                    .body(request)
                    .when().post("/report")
                    .then().log().all()
                    .statusCode(HttpStatus.OK.value());
        }

        @Test
        @DisplayName("댓글에 대해 정상적으로 작동한다.")
        void reportComment() throws Exception {
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
            given(tokenProcessor.resolveToken(anyString())).willReturn("token");
            given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
            given(memberService.findById(anyLong())).willReturn(member);

            ReportRequest request = new ReportRequest(ReportType.COMMENT, 1L, "불건전한 댓글");
            willDoNothing().given(reportService).report(member, request);

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .contentType(ContentType.JSON)
                    .body(request)
                    .when().post("/report")
                    .then().log().all()
                    .statusCode(HttpStatus.OK.value());
        }

        @Test
        @DisplayName("닉네임에 대해 정상적으로 작동한다.")
        void reportNickname() throws Exception {
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
            given(tokenProcessor.resolveToken(anyString())).willReturn("token");
            given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
            given(memberService.findById(anyLong())).willReturn(member);

            ReportRequest request = new ReportRequest(ReportType.NICKNAME, 1L, "불건전한 닉네임");
            willDoNothing().given(reportService).report(member, request);

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .contentType(ContentType.JSON)
                    .body(request)
                    .when().post("/report")
                    .then().log().all()
                    .statusCode(HttpStatus.OK.value());
        }

    }

    @ParameterizedTest
    @NullSource
    @DisplayName("신고 대상 Id가 빈 값인 경우 400을 반환한다.")
    void report(Long id) throws Exception {
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
        given(tokenProcessor.resolveToken(anyString())).willReturn("token");
        given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
        given(memberService.findById(anyLong())).willReturn(member);

        ReportRequest request = new ReportRequest(ReportType.COMMENT, id, "불건전한 게시글");
        willDoNothing().given(reportService).report(member, request);

        // when, then
        RestAssuredMockMvc
                .given().log().all()
                .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/report")
                .then().log().all()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @ParameterizedTest
    @NullAndEmptySource
    @DisplayName("신고 이유가 빈 값일 경우 400을 반환한다.")
    void reportBadRequest(String reason) throws Exception {
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
        given(tokenProcessor.resolveToken(anyString())).willReturn("token");
        given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
        given(memberService.findById(anyLong())).willReturn(member);

        ReportRequest request = new ReportRequest(ReportType.POST, 1L, reason);
        willDoNothing().given(reportService).report(member, request);

        // when, then
        RestAssuredMockMvc
                .given().log().all()
                .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/report")
                .then().log().all()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

}