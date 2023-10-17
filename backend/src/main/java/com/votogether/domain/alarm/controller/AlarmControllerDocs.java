package com.votogether.domain.alarm.controller;

import com.votogether.domain.alarm.dto.ReportActionAlarmResponse;
import com.votogether.domain.alarm.dto.ReportActionResponse;
import com.votogether.domain.member.entity.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.PositiveOrZero;
import java.util.List;
import org.springframework.http.ResponseEntity;

@Tag(name = "알림", description = "알림 API")
public interface AlarmControllerDocs {

    @Operation(summary = "신고조치알림 조회", description = "신고조치알림목록을 조회한다.")
    @ApiResponse(responseCode = "201", description = "조회 성공")
    ResponseEntity<List<ReportActionAlarmResponse>> getReportActionAlarms(
            @Parameter(description = "현재 페이지 위치", example = "0")
            @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page,
            final Member member
    );

    @Operation(summary = "신고조치알림 상세 조회", description = "신고조치알림를 상세 조회한다.")
    @ApiResponse(responseCode = "201", description = "조회 성공")
    public ResponseEntity<ReportActionResponse> getReportActionAlarm(
            @Parameter(description = "신고조치알림 ID", example = "1") final Long reportActionAlarmId,
            final Member member
    );

}
