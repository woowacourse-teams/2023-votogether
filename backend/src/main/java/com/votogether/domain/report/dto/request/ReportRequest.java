package com.votogether.domain.report.dto.request;

import com.votogether.domain.report.entity.vo.ReportType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "신고 요청")
public record ReportRequest(
        @Schema(description = "신고 유형", example = "POST")
        ReportType type,

        @Schema(description = "신고 대상 ID", example = "1")
        @NotNull(message = "신고 대상 ID는 빈 값일 수 없습니다.")
        Long id,

        @Schema(description = "신고 사유", example = "불건전한 닉네임")
        @NotBlank(message = "신고 사유는 빈 값이거나 공백으로만 이루어질 수 없습니다.")
        String reason
) {
}
