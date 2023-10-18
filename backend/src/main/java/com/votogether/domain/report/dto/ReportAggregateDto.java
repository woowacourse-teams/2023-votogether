package com.votogether.domain.report.dto;

import com.votogether.domain.report.entity.vo.ReportType;
import java.time.LocalDateTime;

public record ReportAggregateDto(
        long reportMaxId,
        ReportType reportType,
        long targetId,
        String reasons,
        LocalDateTime createdAt
) {
}
