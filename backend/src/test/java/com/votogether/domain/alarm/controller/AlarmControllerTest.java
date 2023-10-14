package com.votogether.domain.alarm.controller;

import com.votogether.domain.alarm.dto.ReportActionAlarmResponse;
import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.service.AlarmService;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.test.ControllerTest;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.BDDMockito.given;

@WebMvcTest(AlarmControllerTest.class)
class AlarmControllerTest extends ControllerTest {

    @MockBean
    AlarmService alarmService;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.standaloneSetup(new AlarmController(alarmService));
    }

    @Test
    @DisplayName("신고조치알림목록을 가져온다.")
    void getReportAlarmActions() {
        // given
        ReportActionAlarm reportActionAlarm = ReportActionAlarm.builder()
                .reportType(ReportType.POST)
                .isChecked(false)
                .target("1")
                .build();

        ReportActionAlarmResponse response = ReportActionAlarmResponse.of(reportActionAlarm);

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
        assertThat(results.get(0)).usingRecursiveComparison().isEqualTo(response);
    }

}
