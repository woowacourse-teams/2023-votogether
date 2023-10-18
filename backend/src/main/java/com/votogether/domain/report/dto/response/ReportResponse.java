package com.votogether.domain.report.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.votogether.domain.report.dto.ReportAggregateDto;
import com.votogether.domain.report.entity.vo.ReportType;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Schema(description = "신고 정보 응답")
public record ReportResponse(
        @Schema(description = "신고 ID", example = "1")
        long id,

        @Schema(description = "신고 유형", example = "POST")
        ReportType type,

        @Schema(description = "신고 이유들")
        List<String> reasons,

        @Schema(description = "신고 당한 요소의 내용", example = "2")
        String target,

        @Schema(description = "신고 생성시간", example = "2023-08-01 13:56")
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime createdAt
) {

    public static ReportResponse of(final ReportAggregateDto reportAggregateDto, final String target) {
        return new ReportResponse(
                reportAggregateDto.reportMaxId(),
                reportAggregateDto.reportType(),
                Arrays.stream(reportAggregateDto.reasons().split(",")).toList(),
                target,
                reportAggregateDto.createdAt()
        );
    }

}
