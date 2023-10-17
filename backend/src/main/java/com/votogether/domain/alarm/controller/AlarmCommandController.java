package com.votogether.domain.alarm.controller;

import com.votogether.domain.alarm.dto.ReportActionAlarmResponse;
import com.votogether.domain.alarm.dto.ReportActionResponse;
import com.votogether.domain.alarm.service.AlarmService;
import com.votogether.domain.member.entity.Member;
import com.votogether.global.jwt.Auth;
import jakarta.validation.constraints.PositiveOrZero;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RequiredArgsConstructor
@RequestMapping("/alarms")
@RestController
public class AlarmCommandController implements AlarmCommandControllerDocs {

    private final AlarmService alarmService;

    @RequestMapping("/report")
    public ResponseEntity<List<ReportActionAlarmResponse>> getReportActionAlarms(
            @RequestParam @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page,
            @Auth final Member member
    ) {
        final List<ReportActionAlarmResponse> response = alarmService.getReportActionAlarms(member, page);
        return ResponseEntity.ok(response);
    }

    @RequestMapping("/report/{id}")
    public ResponseEntity<ReportActionResponse> getReportActionAlarm(
            @PathVariable("id") final Long reportActionAlarmId,
            @Auth final Member member
    ) {
        final ReportActionResponse response = alarmService.getReportActionAlarm(reportActionAlarmId, member);
        return ResponseEntity.ok(response);
    }

}
