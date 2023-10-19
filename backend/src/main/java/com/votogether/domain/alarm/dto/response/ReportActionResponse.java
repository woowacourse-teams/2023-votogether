package com.votogether.domain.alarm.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.report.entity.vo.ReportType;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Schema(description = "신고조치 응답")
public record ReportActionResponse(
        @Schema(description = "신고조치 ID", example = "1")
        Long reportActionId,

        @Schema(description = "신고조치타입", example = "POST")
        ReportType type,

        @Schema(description = "신고대상내용", example = "1")
        String content,

        @Schema(description = "신고사유")
        Set<String> reasons,

        @Schema(description = "신고조치시간", example = "2023-08-01 13:56")
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime createdAt
) {

    public static ReportActionResponse from(final ReportActionAlarm reportActionAlarm) {
        final Set<String> reasons = Stream.of(reportActionAlarm.getReasons().split(","))
                .map(String::strip)
                .collect(Collectors.toSet());

        return new ReportActionResponse(
                reportActionAlarm.getId(),
                reportActionAlarm.getReportType(),
                reportActionAlarm.getTarget(),
                reasons,
                reportActionAlarm.getCreatedAt()
        );
    }
}
