package com.votogether.domain.notice.controller;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.notice.dto.request.NoticeRequest;
import com.votogether.domain.notice.service.NoticeCommandService;
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
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(NoticeCommandController.class)
class NoticeCommandControllerTest extends ControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    NoticeCommandService noticeCommandService;

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
            given(noticeCommandService.createNotice(any(NoticeRequest.class), any(Member.class))).willReturn(1L);

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

    @Nested
    @DisplayName("공지사항 수정 시")
    class UpdateNotice {

        @Test
        @DisplayName("정상적인 요청이라면 204 응답을 반환한다.")
        void updateNotice() throws Exception {
            // given
            mockingAuthArgumentResolver();
            NoticeRequest noticeRequest = new NoticeRequest(
                    "title",
                    null,
                    null,
                    "content",
                    LocalDateTime.now()
            );
            willDoNothing().given(noticeCommandService).updateNotice(anyLong(), any(NoticeRequest.class));

            // when
            RestAssuredMockMvc
                    .given().log().all()
                    .header(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(ContentType.JSON)
                    .body(noticeRequest)
                    .when().put("/notices/{id}", 1L)
                    .then().log().all()
                    .status(HttpStatus.NO_CONTENT);
        }

        @ParameterizedTest
        @ValueSource(longs = {-1, 0})
        @DisplayName("공지사항 ID가 양수가 아니라면 400 응답을 반환한다.")
        void notPositiveNoticeId(Long noticeId) throws Exception {
            // given
            mockingAuthArgumentResolver();
            NoticeRequest noticeRequest = new NoticeRequest(
                    "title",
                    null,
                    null,
                    "content",
                    LocalDateTime.now()
            );
            willDoNothing().given(noticeCommandService).updateNotice(anyLong(), any(NoticeRequest.class));

            // when
            RestAssuredMockMvc
                    .given().log().all()
                    .header(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .contentType(ContentType.JSON)
                    .body(noticeRequest)
                    .when().put("/notices/{id}", noticeId)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("공지사항 ID는 양수만 가능합니다."));
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
                    .when().put("/notices/{id}", 1L)
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
                    .when().put("/notices/{id}", 1L)
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
                    .when().put("/notices/{id}", 1L)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(200))
                    .body("message", containsString("배너 노출 마감기한을 입력하지 않았습니다."));
        }

    }

    @Nested
    @DisplayName("공지사항 삭제 시")
    class DeleteNotice {

        @Test
        @DisplayName("정상적인 요청이라면 200 응답 반환한다.")
        void deleteNotice() throws Exception {
            // given
            mockingAuthArgumentResolver();
            willDoNothing().given(noticeCommandService).deleteNotice(anyLong());

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .header(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .when().delete("/notices/{id}", 1L)
                    .then().log().all()
                    .status(HttpStatus.NO_CONTENT);
        }

        @ParameterizedTest
        @ValueSource(longs = {-1, 0})
        @DisplayName("공지사항 ID가 양수가 아니라면 400 응답을 반환한다.")
        void notPositiveNoticeId(Long noticeId) throws Exception {
            // given
            mockingAuthArgumentResolver();
            willDoNothing().given(noticeCommandService).deleteNotice(anyLong());

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .header(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .when().delete("/notices/{id}", noticeId)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("공지사항 ID는 양수만 가능합니다."));
        }

    }

}
