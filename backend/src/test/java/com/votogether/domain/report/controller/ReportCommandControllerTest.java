package com.votogether.domain.report.controller;

import static org.mockito.BDDMockito.willDoNothing;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.vo.Gender;
import com.votogether.domain.member.entity.vo.SocialType;
import com.votogether.domain.report.dto.request.ReportActionRequest;
import com.votogether.domain.report.dto.request.ReportRequest;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.domain.report.service.ReportCommandService;
import com.votogether.test.ControllerTest;
import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ReportCommandController.class)
class ReportCommandControllerTest extends ControllerTest {

    @MockBean
    ReportCommandService reportCommandService;

    @Autowired
    MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.mockMvc(mockMvc);
    }

    @Nested
    @DisplayName("신고 기능은 ")
    class Report {

        @Test
        @DisplayName("게시글에 대해 정상적으로 작동한다.")
        void reportPost() throws Exception {
            // given
            mockingAuthArgumentResolver();

            Member member = Member.builder()
                    .nickname("저문")
                    .gender(Gender.MALE)
                    .birthYear(1977)
                    .socialId("abc123")
                    .socialType(SocialType.KAKAO)
                    .build();
            ReportRequest request = new ReportRequest(ReportType.POST, 1L, "불건전한 게시글");
            willDoNothing().given(reportCommandService).report(member, request);

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .contentType(ContentType.JSON)
                    .body(request)
                    .when().post("/report")
                    .then().log().all()
                    .assertThat()
                    .status(HttpStatus.OK);
        }

        @Test
        @DisplayName("댓글에 대해 정상적으로 작동한다.")
        void reportComment() throws Exception {
            // given
            mockingAuthArgumentResolver();

            Member member = Member.builder()
                    .nickname("저문")
                    .gender(Gender.MALE)
                    .birthYear(1966)
                    .socialId("abc123")
                    .socialType(SocialType.KAKAO)
                    .build();
            ReportRequest request = new ReportRequest(ReportType.COMMENT, 1L, "불건전한 댓글");
            willDoNothing().given(reportCommandService).report(member, request);

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .contentType(ContentType.JSON)
                    .body(request)
                    .when().post("/report")
                    .then().log().all()
                    .assertThat()
                    .status(HttpStatus.OK);
        }

        @Test
        @DisplayName("닉네임에 대해 정상적으로 작동한다.")
        void reportNickname() throws Exception {
            // given
            mockingAuthArgumentResolver();

            Member member = Member.builder()
                    .nickname("저문")
                    .gender(Gender.MALE)
                    .birthYear(1966)
                    .socialId("abc123")
                    .socialType(SocialType.KAKAO)
                    .build();
            ReportRequest request = new ReportRequest(ReportType.NICKNAME, 1L, "불건전한 닉네임");
            willDoNothing().given(reportCommandService).report(member, request);

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .contentType(ContentType.JSON)
                    .body(request)
                    .when().post("/report")
                    .then().log().all()
                    .assertThat()
                    .status(HttpStatus.OK);
        }

    }

    @ParameterizedTest
    @NullSource
    @DisplayName("신고 대상 Id가 빈 값인 경우 400을 반환한다.")
    void report(Long id) throws Exception {
        // given
        mockingAuthArgumentResolver();

        Member member = Member.builder()
                .nickname("저문")
                .gender(Gender.MALE)
                .birthYear(1966)
                .socialId("abc123")
                .socialType(SocialType.KAKAO)
                .build();
        ReportRequest request = new ReportRequest(ReportType.COMMENT, id, "불건전한 게시글");
        willDoNothing().given(reportCommandService).report(member, request);

        // when, then
        RestAssuredMockMvc
                .given().log().all()
                .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/report")
                .then().log().all()
                .assertThat()
                .status(HttpStatus.BAD_REQUEST);
    }

    @ParameterizedTest
    @NullAndEmptySource
    @DisplayName("신고 이유가 빈 값일 경우 400을 반환한다.")
    void reportBadRequest(String reason) throws Exception {
        // given
        mockingAuthArgumentResolver();

        Member member = Member.builder()
                .nickname("저문")
                .gender(Gender.MALE)
                .birthYear(1966)
                .socialId("abc123")
                .socialType(SocialType.KAKAO)
                .build();
        ReportRequest request = new ReportRequest(ReportType.POST, 1L, reason);
        willDoNothing().given(reportCommandService).report(member, request);

        // when, then
        RestAssuredMockMvc
                .given().log().all()
                .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/report")
                .then().log().all()
                .assertThat()
                .status(HttpStatus.BAD_REQUEST);
    }

    @Nested
    @DisplayName("신고 조치 기능은")
    class ReportAction {

        @Test
        @DisplayName("정상적으로 작동한다.")
        void reportAction() throws Exception {
            // given
            mockingAuthArgumentResolver();

            ReportActionRequest request = new ReportActionRequest(1L, true);
            willDoNothing().given(reportCommandService).reportAction(request);

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .contentType(ContentType.JSON)
                    .body(request)
                    .when().post("/reports/action/admin")
                    .then().log().all()
                    .assertThat()
                    .status(HttpStatus.OK);
        }

        @ParameterizedTest
        @NullSource
        @ValueSource(longs = {-1, 0})
        @DisplayName("신고 Id가 양수가 아닌 경우 400을 반환한다.")
        void reportIdNotPositiveException(Long reportId) throws Exception {
            // given
            mockingAuthArgumentResolver();

            ReportActionRequest request = new ReportActionRequest(reportId, true);
            willDoNothing().given(reportCommandService).reportAction(request);

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .contentType(ContentType.JSON)
                    .body(request)
                    .when().post("/reports/action/admin")
                    .then().log().all()
                    .assertThat()
                    .status(HttpStatus.BAD_REQUEST);
        }

    }

}
