package com.votogether.domain.alarm.controller;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.anyLong;
import static org.mockito.BDDMockito.willDoNothing;

import com.votogether.domain.alarm.service.AlarmCommandService;
import com.votogether.domain.member.entity.Member;
import com.votogether.test.ControllerTest;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
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

@WebMvcTest(AlarmCommandController.class)
class AlarmCommandControllerTest extends ControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    AlarmCommandService alarmCommandService;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.mockMvc(mockMvc);
    }

    @Nested
    @DisplayName("알림을 읽을 시")
    class ReadAlarm {

        @Test
        @DisplayName("정상적인 요청이라면 200 응답을 반환한다.")
        void readAlarm() throws Exception {
            // given
            mockingAuthArgumentResolver();
            willDoNothing().given(alarmCommandService).readAlarm(anyLong(), anyString(), any(Member.class));

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .param("type", "CONTENT")
                    .when().patch("/alarms/{id}", 1L)
                    .then().log().all()
                    .status(HttpStatus.OK);
        }

        @ParameterizedTest
        @ValueSource(longs = {-1, 0})
        @DisplayName("알림ID가 양수가 아니라면 400 응답을 반환한다.")
        void negativeAlarmId(Long alarmId) throws Exception {
            // given
            mockingAuthArgumentResolver();
            willDoNothing().given(alarmCommandService).readAlarm(anyLong(), anyString(), any(Member.class));

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .param("type", "CONTENT")
                    .when().patch("/alarms/{id}", alarmId)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("알림 ID는 양수만 가능합니다."));
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " "})
        @DisplayName("알림 타입이 공백이거나 존재하지 않으면 400 응답을 반환한다.")
        void emptyAlarmType(String alarmType) throws Exception {
            // given
            mockingAuthArgumentResolver();
            willDoNothing().given(alarmCommandService).readAlarm(anyLong(), anyString(), any(Member.class));

            // when, then
            RestAssuredMockMvc
                    .given().log().all()
                    .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                    .param("type", alarmType)
                    .when().patch("/alarms/{id}", 1L)
                    .then().log().all()
                    .status(HttpStatus.BAD_REQUEST)
                    .body("code", equalTo(201))
                    .body("message", containsString("알림 타입이 공백이거나 존재하지 않습니다."));
        }

    }

}
