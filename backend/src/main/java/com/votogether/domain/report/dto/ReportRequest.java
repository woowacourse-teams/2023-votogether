package com.votogether.domain.report.dto;

public record ReportRequest(
        String type,
        Long id,
        String reason
) {
}
