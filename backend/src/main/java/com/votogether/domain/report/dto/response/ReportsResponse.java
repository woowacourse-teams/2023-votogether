package com.votogether.domain.report.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "신고 조치 예정 목록 응답")
public record ReportsResponse(
        @Schema(description = "신고 조치 예정 목록 전체 페이지 수", example = "20")
        long totalPageCount,

        @Schema(description = "신고 조치 예정 목록 중 현재 페이지", example = "3")
        long currentPageNumber,

        @Schema(description = "신고 조치 예정 목록")
        List<ReportResponse> reports
) {
}
