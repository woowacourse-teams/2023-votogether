package com.votogether.domain.report.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Schema(description = "신고 조치 요청")
public record ReportActionRequest(
        @Schema(description = "신고 ID", example = "1")
        @NotNull(message = "신고 ID는 빈 값일 수 없습니다.")
        @Positive(message = "신고 ID는 양의 정수만 가능합니다.")
        Long id,

        @Schema(description = "신고 조치 여부", example = "true")
        boolean hasAction
) {
}
