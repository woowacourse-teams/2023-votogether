package com.votogether.domain.report.controller;

import com.votogether.domain.report.dto.response.ReportPageResponse;
import com.votogether.domain.report.service.ReportQueryService;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RequiredArgsConstructor
@RestController
public class ReportQueryController implements ReportQueryControllerDocs {

    private final ReportQueryService reportQueryService;

    @GetMapping("/reports/admin")
    public ResponseEntity<ReportPageResponse> getReports(
            @RequestParam @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page
    ) {
        final ReportPageResponse reportPageResponse = reportQueryService.getReports(page);
        return ResponseEntity.ok(reportPageResponse);
    }

}
