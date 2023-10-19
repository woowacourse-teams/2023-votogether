package com.votogether.domain.notice.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;

import com.votogether.domain.notice.dto.response.NoticePageResponse;
import com.votogether.domain.notice.dto.response.NoticeResponse;
import com.votogether.domain.notice.service.NoticeQueryService;
import com.votogether.test.ControllerTest;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(NoticeQueryController.class)
class NoticeQueryControllerTest extends ControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    NoticeQueryService noticeQueryService;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.mockMvc(mockMvc);
    }

    @Test
    @DisplayName("배너 공지사항 조회에 성공하면 200 응답을 반환한다.")
    void getProgressNotice() throws Exception {
        // given
        mockingAuthArgumentResolver();
        NoticeResponse expected = new NoticeResponse(
                1L,
                "title",
                "bannerTitle",
                "bannerSubtitle",
                "content",
                LocalDateTime.now().plusDays(1).truncatedTo(ChronoUnit.MINUTES),
                LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES)
        );
        given(noticeQueryService.getProgressNotice()).willReturn(expected);

        // when
        NoticeResponse result = RestAssuredMockMvc
                .given().log().all()
                .header(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                .when().get("/notices/progress")
                .then().log().all()
                .status(HttpStatus.OK)
                .extract()
                .as(NoticeResponse.class);

        // then
        assertThat(result).usingRecursiveComparison().isEqualTo(expected);
    }

    @Nested
    @DisplayName("공지사항 목록 조회 시")
    class GetNotices {

        @Test
        @DisplayName("정상적인 요청이라면 200 응답을 반환한다.")
        void getNotices() throws Exception {
            // given
            mockingAuthArgumentResolver();
            NoticeResponse noticeResponse = new NoticeResponse(
                    1L,
                    "title",
                    "bannerTitle",
                    "bannerSubtitle",
                    "content",
                    LocalDateTime.now().plusDays(1).truncatedTo(ChronoUnit.MINUTES),
                    LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES)
            );
            NoticePageResponse expected = new NoticePageResponse(1, 0, List.of(noticeResponse));
            given(noticeQueryService.getNotices(anyInt())).willReturn(expected);

            // when
            NoticePageResponse result = RestAssuredMockMvc
                    .given().log().all()
                    .header(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .param("page", 0)
                    .when().get("/notices")
                    .then().log().all()
                    .status(HttpStatus.OK)
                    .extract()
                    .as(NoticePageResponse.class);

            // then
            assertThat(result).usingRecursiveComparison().isEqualTo(expected);
        }

        @Test
        @DisplayName("페이지가 음수라면 400 응답을 반환한다.")
        void negativePage() throws Exception {
            // given
            mockingAuthArgumentResolver();
            NoticeResponse noticeResponse = new NoticeResponse(
                    1L,
                    "title",
                    "bannerTitle",
                    "bannerSubtitle",
                    "content",
                    LocalDateTime.now().plusDays(1),
                    LocalDateTime.now()
            );
            NoticePageResponse expected = new NoticePageResponse(1, 0, List.of(noticeResponse));
            given(noticeQueryService.getNotices(anyInt())).willReturn(expected);

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .header(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .param("page", -1)
                    .when().get("/notices")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("페이지는 0이상 정수만 가능합니다."));
        }

    }

    @Nested
    @DisplayName("공지사항 상세 조회 시")
    class GetNotice {

        @Test
        @DisplayName("정상적인 요청이라면 200 응답을 반환한다.")
        void getNotice() throws Exception {
            // given
            mockingAuthArgumentResolver();
            NoticeResponse expected = new NoticeResponse(
                    1L,
                    "title",
                    "bannerTitle",
                    "bannerSubtitle",
                    "content",
                    LocalDateTime.now().plusDays(1).truncatedTo(ChronoUnit.MINUTES),
                    LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES)
            );
            given(noticeQueryService.getNotice(anyLong())).willReturn(expected);

            // when
            NoticeResponse result = RestAssuredMockMvc
                    .given().log().all()
                    .header(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .when().get("/notices/{id}", 1L)
                    .then().log().all()
                    .status(HttpStatus.OK)
                    .extract()
                    .as(NoticeResponse.class);

            // then
            assertThat(result).usingRecursiveComparison().isEqualTo(expected);
        }

        @ParameterizedTest
        @ValueSource(longs = {-1, 0})
        @DisplayName("공지사항 ID가 양수가 아니라면 400 응답을 반환한다.")
        void notPositiveNoticeId(Long noticeId) throws Exception {
            // given
            mockingAuthArgumentResolver();

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .header(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .when().get("/notices/{id}", noticeId)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("공지사항 ID는 양수만 가능합니다."));
        }

    }

}
