package com.votogether.domain.alarm.controller;

import com.votogether.domain.alarm.service.AlarmCommandService;
import com.votogether.domain.member.entity.Member;
import com.votogether.global.jwt.Auth;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RequiredArgsConstructor
@RequestMapping("/alarms")
@RestController
public class AlarmCommandController implements AlarmCommandControllerDocs {

    private final AlarmCommandService alarmCommandService;

    @PatchMapping("/{id}")
    public ResponseEntity<Void> readAlarm(
            @PathVariable("id") @Positive(message = "알림 ID는 양수만 가능합니다.") final Long alarmId,
            @Auth final Member loginMember
    ) {
        alarmCommandService.readAlarm(alarmId, loginMember);
        return ResponseEntity.ok().build();
    }

}
