package com.votogether.domain.report.controller;

import com.votogether.domain.report.dto.response.ReportsResponse;
import com.votogether.domain.report.service.ReportQueryService;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ReportQueryController {

    private final ReportQueryService reportQueryService;

    @GetMapping("/reports/admin")
    public ResponseEntity<ReportsResponse> getReports(
            @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final long page
    ) {
        final ReportsResponse reportsResponse = reportQueryService.getReports(page);
        return ResponseEntity.ok(reportsResponse);
    }

}
