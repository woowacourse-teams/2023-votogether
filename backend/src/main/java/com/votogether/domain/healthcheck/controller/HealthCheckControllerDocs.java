package com.votogether.domain.healthcheck.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "헬스 체크", description = "헬스 체크 API")
public interface HealthCheckControllerDocs {

    @Operation(summary = "헬스 체크", description = "헬스 체크를 한다.")
    @ApiResponse(responseCode = "200", description = "헬스 체크 성공")
    ResponseEntity<String> check();

}
