package com.votogether.domain.alarm.controller;

import com.votogether.domain.alarm.dto.response.PostAlarmResponse;
import com.votogether.domain.alarm.service.AlarmQueryService;
import jakarta.validation.constraints.PositiveOrZero;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RequiredArgsConstructor
@RequestMapping("/alarms")
@RestController
public class AlarmQueryQueryController implements AlarmQueryControllerDocs {

    private final AlarmQueryService alarmQueryService;

    @GetMapping("/content")
    public ResponseEntity<List<PostAlarmResponse>> getPostAlarm(
            @RequestParam @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page
    ) {
        final List<PostAlarmResponse> postAlarmResponses = alarmQueryService.getPostAlarm(page);
        return ResponseEntity.ok(postAlarmResponses);
    }

}
