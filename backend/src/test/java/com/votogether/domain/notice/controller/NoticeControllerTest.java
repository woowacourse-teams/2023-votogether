package com.votogether.domain.notice.controller;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.notice.dto.request.NoticeRequest;
import com.votogether.domain.notice.service.NoticeService;
import com.votogether.test.ControllerTest;
import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import java.time.LocalDateTime;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(NoticeController.class)
class NoticeControllerTest extends ControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    NoticeService noticeService;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.mockMvc(mockMvc);
    }

    @Nested
    @DisplayName("공지사항 생성 시")
    class CreateNotice {

        @Test
        @DisplayName("정상적인 요청이라면 200 응답을 반환한다.")
        void createNotice() throws Exception {
            // given
            mockingAuthArgumentResolver();
            NoticeRequest noticeRequest = new NoticeRequest(
                    "title",
                    null,
                    null,
                    "content",
                    LocalDateTime.now()
            );
            BDDMockito.given(noticeService.createNotice(any(NoticeRequest.class), any(Member.class))).willReturn(1L);

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .header(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(ContentType.JSON)
                    .body(noticeRequest)
                    .when().post("/notices")
                    .then().log().all()
                    .status(HttpStatus.CREATED)
                    .header("Location", "/notices/1");
        }

        @ParameterizedTest
        @NullAndEmptySource
        @DisplayName("공지사항 제목이 존재하지 않거나 공백이라면 400 응답을 반환한다.")
        void nullAndEmptyTitle(String title) throws Exception {
            // given
            mockingAuthArgumentResolver();
            NoticeRequest noticeRequest = new NoticeRequest(
                    title,
                    null,
                    null,
                    "content",
                    LocalDateTime.now()
            );

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .header(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(ContentType.JSON)
                    .body(noticeRequest)
                    .when().post("/notices")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(200))
                    .body("message", containsString("공지사항 제목을 입력하지 않았습니다."));
        }

        @ParameterizedTest
        @NullAndEmptySource
        @DisplayName("공지사항 내용이 존재하지 않거나 공백이라면 400 응답을 반환한다.")
        void nullAndEmptyContent(String content) throws Exception {
            // given
            mockingAuthArgumentResolver();
            NoticeRequest noticeRequest = new NoticeRequest(
                    "title",
                    null,
                    null,
                    content,
                    LocalDateTime.now()
            );

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .header(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(ContentType.JSON)
                    .body(noticeRequest)
                    .when().post("/notices")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(200))
                    .body("message", containsString("공지사항 내용을 입력하지 않았습니다."));
        }

        @Test
        @DisplayName("공지사항 배너 마감기한이 존재하지 않으면 400 응답을 반환한다.")
        void nullDeadline() throws Exception {
            // given
            mockingAuthArgumentResolver();
            NoticeRequest noticeRequest = new NoticeRequest(
                    "title",
                    null,
                    null,
                    "content",
                    null
            );

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .header(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(ContentType.JSON)
                    .body(noticeRequest)
                    .when().post("/notices")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(200))
                    .body("message", containsString("배너 노출 마감기한을 입력하지 않았습니다."));
        }

    }

}
