package com.votogether.domain.alarm.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;

import com.votogether.domain.alarm.dto.response.ReportActionAlarmResponse;
import com.votogether.domain.alarm.dto.response.ReportActionResponse;
import com.votogether.domain.alarm.dto.response.PostAlarmDetailResponse;
import com.votogether.domain.alarm.dto.response.PostAlarmResponse;
import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.service.AlarmQueryService;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.test.ControllerTest;
import io.restassured.common.mapper.TypeRef;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

@WebMvcTest(AlarmQueryController.class)
class AlarmQueryControllerTest extends ControllerTest {

    @MockBean
    AlarmQueryService alarmQueryService;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.standaloneSetup(new AlarmQueryController(alarmQueryService));
    }

    @Test
    @DisplayName("게시글 내역 목록을 조회한다.")
    void getPostAlarm() throws Exception {
        // given
        mockingAuthArgumentResolver();

        PostAlarmDetailResponse postAlarmDetailResponse = new PostAlarmDetailResponse(1L, "title", "저문");
        PostAlarmResponse postAlarmResponse = new PostAlarmResponse(1L, postAlarmDetailResponse,
                LocalDateTime.now(), false);

        given(alarmQueryService.getPostAlarm(any(Member.class), anyInt())).willReturn(List.of(postAlarmResponse));

        // when
        List<PostAlarmResponse> postAlarmResponses = RestAssuredMockMvc
                .given().log().all()
                .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                .queryParam("page", 0)
                .when().get("/alarms/content")
                .then().log().all()
                .extract()
                .as(new TypeRef<>() {
                });

        // then
        PostAlarmResponse actualPostAlarmResponse = postAlarmResponses.get(0);
        PostAlarmDetailResponse actualPostAlarmDetailResponse = actualPostAlarmResponse.detail();
        assertSoftly(softly -> {
            softly.assertThat(postAlarmResponses).hasSize(1);
            softly.assertThat(actualPostAlarmResponse.isChecked()).isEqualTo(false);
            softly.assertThat(actualPostAlarmDetailResponse.postTitle()).isEqualTo("title");
            softly.assertThat(actualPostAlarmDetailResponse.commentWriter()).isEqualTo("저문");
        });
    }

    @Test
    @DisplayName("신고조치알림목록을 가져온다.")
    void getReportAlarmActions() {
        // given
        ReportActionAlarm reportActionAlarm = ReportActionAlarm.builder()
                .reportType(ReportType.POST)
                .isChecked(false)
                .reasons("광고성, 부적합성")
                .target("1")
                .build();
        ReportActionAlarmResponse response = ReportActionAlarmResponse.from(reportActionAlarm);
        given(alarmQueryService.getReportActionAlarms(any(Member.class), anyInt()))
                .willReturn(List.of(response));

        // when
        List<ReportActionAlarmResponse> results = RestAssuredMockMvc
                .given().log().all()
                .queryParam("page", 0)
                .when().get("/alarms/report?page=0")
                .then().log().all()
                .status(HttpStatus.OK)
                .extract()
                .as(new TypeRef<>() {
                });

        // then
        assertThat(results.get(0)).isEqualTo(response);
    }

    @Test
    @DisplayName("신고조치알림을 상세조회한다.")
    void getReportAlarmAction() {
        // given
        ReportActionAlarm reportActionAlarm = ReportActionAlarm.builder()
                .reportType(ReportType.POST)
                .isChecked(false)
                .target("1")
                .reasons("광고성, 부적합성")
                .build();
        ReportActionResponse response = ReportActionResponse.from(reportActionAlarm);
        given(alarmQueryService.getReportActionAlarm(anyLong(), any(Member.class)))
                .willReturn(response);

        // when
        ReportActionResponse result = RestAssuredMockMvc
                .given().log().all()
                .when().get("/alarms/report/{id}", 1)
                .then().log().all()
                .status(HttpStatus.OK)
                .extract()
                .as(ReportActionResponse.class);

        // then
        assertThat(result).isEqualTo(response);
    }

}
