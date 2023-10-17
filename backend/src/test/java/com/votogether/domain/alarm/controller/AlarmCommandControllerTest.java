package com.votogether.domain.alarm.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;

import com.votogether.domain.alarm.dto.ReportActionAlarmResponse;
import com.votogether.domain.alarm.dto.ReportActionResponse;
import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.service.AlarmService;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.test.ControllerTest;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;

@WebMvcTest(AlarmCommandControllerTest.class)
class AlarmCommandControllerTest extends ControllerTest {

    @MockBean
    AlarmService alarmService;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.standaloneSetup(new AlarmCommandController(alarmService));
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
        given(alarmService.getReportActionAlarms(any(Member.class), anyInt()))
                .willReturn(List.of(response));

        // when
        List<ReportActionAlarmResponse> results = RestAssuredMockMvc
                .when().get("/alarms/report?page=0")
                .then().log().all()
                .status(HttpStatus.OK)
                .extract()
                .as(new ParameterizedTypeReference<List<ReportActionAlarmResponse>>() {
                }.getType());

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
        given(alarmService.getReportActionAlarm(anyLong(), any(Member.class)))
                .willReturn(response);

        // when
        ReportActionResponse result = RestAssuredMockMvc
                .when().get("/alarms/report/{id}", 1)
                .then().log().all()
                .status(HttpStatus.OK)
                .extract()
                .as(ReportActionResponse.class);

        // then
        assertThat(result).isEqualTo(response);
    }

}
