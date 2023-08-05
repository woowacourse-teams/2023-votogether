package com.votogether.domain.report.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "신고 요청")
public record ReportRequest(
        @Schema(description = "신고유형", example = "POST")
        @NotBlank(message = "신고유형은 빈 값이거나 공백으로만 이루어질 수 없습니다.")
        String type,
        @Schema(description = "신고대상ID", example = "1")
        @NotBlank(message = "대상 ID값은 빈 값이거나 공백으로만 이루어질 수 없습니다.")
        Long id,
        @Schema(description = "신고 사유", example = "불건전한 닉네임")
        @NotBlank(message = "신고 이유는 빈 값이거나 공백으로만 이루어질 수 없습니다.")
        String reason
) {
}
