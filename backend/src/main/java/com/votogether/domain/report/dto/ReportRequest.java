package com.votogether.domain.report.dto;

import jakarta.validation.constraints.NotBlank;

public record ReportRequest(
        @NotBlank(message = "신고유형은 빈 값이거나 공백으로만 이루어질 수 없습니다.")
        String type,
        @NotBlank(message = "대상 ID값은 빈 값이거나 공백으로만 이루어질 수 없습니다.")
        Long id,
        @NotBlank(message = "신고 이유는 빈 값이거나 공백으로만 이루어질 수 없습니다.")
        String reason
) {
}
