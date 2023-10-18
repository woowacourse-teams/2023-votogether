package com.votogether.domain.alarm.controller;

import com.votogether.domain.alarm.service.AlarmCommandService;
import com.votogether.domain.member.entity.Member;
import com.votogether.global.jwt.Auth;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
            @RequestParam("type") @NotBlank(message = "알림 타입이 공백이거나 존재하지 않습니다.") final String type,
            @Auth final Member loginMember
    ) {
        alarmCommandService.readAlarm(alarmId, type, loginMember);
        return ResponseEntity.ok().build();
    }

}
