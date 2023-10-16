package com.votogether.domain.report.dto.response;

import com.votogether.domain.report.entity.Report;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.stream.IntStream;

@Schema(description = "신고 조치 예정 목록 응답")
public record ReportsPageResponse(
        @Schema(description = "신고 조치 예정 목록 전체 페이지 수", example = "20")
        long totalPageNumber,

        @Schema(description = "신고 조치 예정 목록 중 현재 페이지", example = "3")
        long currentPageNumber,

        @Schema(description = "신고 조치 예정 목록")
        List<ReportResponse> reports
) {

    public static ReportsPageResponse of(
            final int totalPageNumber,
            final int currentPageNumber,
            final List<Report> reports,
            final List<String> targets
    ) {
        return new ReportsPageResponse(
                totalPageNumber,
                currentPageNumber,
                IntStream.range(0, reports.size())
                        .mapToObj(index -> ReportResponse.of(reports.get(index), targets.get(index)))
                        .toList()
        );
    }

}
