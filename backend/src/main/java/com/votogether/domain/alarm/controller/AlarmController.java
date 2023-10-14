package com.votogether.domain.alarm.controller;

import com.votogether.domain.alarm.dto.ReportActionAlarmResponse;
import com.votogether.domain.alarm.service.AlarmService;
import com.votogether.domain.member.entity.Member;
import com.votogether.global.jwt.Auth;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/alarms")
public class AlarmController {

    private final AlarmService alarmService;

    @RequestMapping("/report")
    public ResponseEntity<List<ReportActionAlarmResponse>> getReportActionAlarms(
            @RequestParam @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page,
            @Auth final Member member
    ) {
        final List<ReportActionAlarmResponse> reportActionAlarms = alarmService.getReportActionAlarms(member, page);
        return ResponseEntity.ok().body(reportActionAlarms);
    }

}
