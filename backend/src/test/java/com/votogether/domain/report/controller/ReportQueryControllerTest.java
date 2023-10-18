package com.votogether.domain.report.controller;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.BDDMockito.given;

import com.votogether.domain.report.dto.ReportAggregateDto;
import com.votogether.domain.report.dto.response.ReportPageResponse;
import com.votogether.domain.report.dto.response.ReportResponse;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.domain.report.service.ReportQueryService;
import com.votogether.test.ControllerTest;
import io.restassured.common.mapper.TypeRef;
import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ReportQueryController.class)
class ReportQueryControllerTest extends ControllerTest {

    @MockBean
    ReportQueryService reportQueryService;

    @Autowired
    MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.mockMvc(mockMvc);
    }

    @Nested
    @DisplayName("신고 조치 예정 목록 조회")
    class GetReports {

        @Test
        @DisplayName("신고 조치 예정 목록을 조회에 성공하면 200 응답을 반환한다.")
        void getReports() throws Exception {
            // given
            mockingAuthArgumentResolver();

            int totalPages = 3;
            int currentPageNumber = 1;
            String reason = "reason";
            ReportType reportType = ReportType.POST;
            long targetId = 1L;

            ReportAggregateDto reportAggregateDto = new ReportAggregateDto(
                    1L,
                    reportType,
                    targetId,
                    reason,
                    LocalDateTime.now()
            );

            ReportPageResponse reportPageResponse =
                    ReportPageResponse.of(
                            totalPages,
                            currentPageNumber,
                            List.of(ReportResponse.of(reportAggregateDto, Long.toString(targetId)))
                    );

            int page = 0;
            given(reportQueryService.getReports(page)).willReturn(reportPageResponse);

            // when
            ReportPageResponse reportPageResponses = RestAssuredMockMvc
                    .given().log().all()
                    .contentType(ContentType.JSON)
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .param("page", page)
                    .when().get("/reports/admin")
                    .then().log().all()
                    .status(HttpStatus.OK)
                    .extract()
                    .as(new TypeRef<>() {
                    });

            // then
            List<ReportResponse> reports = reportPageResponses.reports();
            ReportResponse reportResponse = reports.get(0);
            assertSoftly(softly -> {
                softly.assertThat(reportPageResponses.totalPageNumber()).isEqualTo(totalPages);
                softly.assertThat(reportPageResponses.currentPageNumber()).isEqualTo(currentPageNumber);
                softly.assertThat(reports).hasSize(1);
                softly.assertThat(reportResponse.target()).isEqualTo(Long.toString(targetId));
                softly.assertThat(reportResponse.type()).isEqualTo(reportType);
                softly.assertThat(reportResponse.reasons()).containsExactly(reason);
            });
        }

        @Test
        @DisplayName("페이지가 음수라면 400 응답을 반환한다.")
        void return400pageNegative() throws Exception {
            // given
            mockingAuthArgumentResolver();

            //  when, then
            RestAssuredMockMvc.given().log().all()
                    .contentType(ContentType.JSON)
                    .headers(HttpHeaders.AUTHORIZATION, "Bearer token")
                    .param("page", -1)
                    .when().get("/reports/admin")
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("페이지는 0이상 정수만 가능합니다."));
        }

    }

}
