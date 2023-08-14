package com.votogether.domain.healthcheck.controller;

import com.votogether.domain.healthcheck.service.HealthCheckService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/health-check")
@RestController
public class HealthCheckController implements HealthCheckControllerDocs {

    private final HealthCheckService healthCheckService;

    @GetMapping
    public ResponseEntity<String> check() {
        final String response = healthCheckService.check();
        return ResponseEntity.ok(response);
    }

}
