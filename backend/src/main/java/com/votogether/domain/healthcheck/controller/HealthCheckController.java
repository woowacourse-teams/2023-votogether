package com.votogether.domain.healthcheck.controller;

import com.votogether.domain.healthcheck.service.HealthCheckService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "헬스 체크", description = "헬스 체크 API")
@RequiredArgsConstructor
@RequestMapping("/health-check")
@RestController
public class HealthCheckController {

    private final HealthCheckService healthCheckService;

    @Operation(summary = "헬스 체크 조회", description = "서버의 작동 여부 확인을 위해 헬스 체크를 조회한다.")
    @ApiResponse(responseCode = "200", description = "헬스 체크 조회 성공")
    @GetMapping
    public ResponseEntity<String> check() {
        final String response = healthCheckService.check();
        return ResponseEntity.ok(response);
    }

}
