package com.votogether.domain.alarm.controller;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.mockito.BDDMockito.given;

import com.votogether.domain.alarm.dto.response.PostAlarmDetailResponse;
import com.votogether.domain.alarm.dto.response.PostAlarmResponse;
import com.votogether.domain.alarm.service.AlarmService;
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

@WebMvcTest(AlarmController.class)
class AlarmControllerTest extends ControllerTest {

    @MockBean
    private AlarmService alarmService;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.standaloneSetup(new AlarmController(alarmService));
    }

    @Test
    @DisplayName("게시글 내역 목록을 조회한다.")
    void getPostAlarm() throws Exception {
        // given
        mockingAuthArgumentResolver();

        int page = 0;
        PostAlarmDetailResponse postAlarmDetailResponse = new PostAlarmDetailResponse(1L, "title", "저문");
        PostAlarmResponse postAlarmResponse = new PostAlarmResponse(1L, postAlarmDetailResponse,
                LocalDateTime.now(), false);

        given(alarmService.getPostAlarm(page)).willReturn(List.of(postAlarmResponse));

        // when
        List<PostAlarmResponse> postAlarmResponses = RestAssuredMockMvc
                .given().log().all()
                .headers(HttpHeaders.AUTHORIZATION, BEARER_TOKEN)
                .queryParam("page", page)
                .when().get("/alarms/content")
                .then().log().all()
                .extract()
                .as(new TypeRef<>() {
                });

        // then
        PostAlarmResponse actualPostAlarmResponse = postAlarmResponses.get(0);
        assertSoftly(softly -> {
            softly.assertThat(postAlarmResponses).hasSize(1);
            softly.assertThat(actualPostAlarmResponse).usingRecursiveComparison().isEqualTo(postAlarmResponse);
        });
    }

}
