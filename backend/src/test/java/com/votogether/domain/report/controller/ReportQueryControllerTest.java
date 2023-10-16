package com.votogether.domain.report.controller;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.BDDMockito.given;

import com.votogether.domain.report.dto.response.ReportResponse;
import com.votogether.domain.report.dto.response.ReportsPageResponse;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.domain.report.service.ReportQueryService;
import com.votogether.test.ControllerTest;
import com.votogether.test.fixtures.MemberFixtures;
import io.restassured.common.mapper.TypeRef;
import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import java.util.List;
import java.util.stream.IntStream;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.test.util.ReflectionTestUtils;
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

            final int totalPages = 3;
            final int currentPageNumber = 1;
            final String reason = "reason";
            final ReportType reportType = ReportType.POST;
            final Long targetId = 1L;

            final Report report = Report.builder()
                    .reason(reason)
                    .reportType(reportType)
                    .targetId(targetId)
                    .member(MemberFixtures.MALE_10.get())
                    .build();
            ReflectionTestUtils.setField(report, "id", 1L);

            final ReportsPageResponse reportsPageResponse =
                    ReportsPageResponse.of(
                            totalPages,
                            currentPageNumber,
                            List.of(ReportResponse.of(report, targetId.toString()))
                    );

            int page = 0;
            given(reportQueryService.getReports(page)).willReturn(reportsPageResponse);

            // when
            final ReportsPageResponse reportsPageResponses = RestAssuredMockMvc
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
            final List<ReportResponse> reports = reportsPageResponses.reports();
            final ReportResponse reportResponse = reports.get(0);
            assertSoftly(softly -> {
                softly.assertThat(reportsPageResponses.totalPageNumber()).isEqualTo(totalPages);
                softly.assertThat(reportsPageResponses.currentPageNumber()).isEqualTo(currentPageNumber);
                softly.assertThat(reports).hasSize(1);
                softly.assertThat(reportResponse.target()).isEqualTo(targetId.toString());
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
