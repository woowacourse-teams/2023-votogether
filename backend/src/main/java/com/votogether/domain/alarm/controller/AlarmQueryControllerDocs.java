package com.votogether.domain.alarm.controller;

import com.votogether.domain.alarm.dto.response.ReportActionAlarmResponse;
import com.votogether.domain.alarm.dto.response.ReportActionResponse;
import com.votogether.domain.alarm.dto.response.PostAlarmResponse;
import com.votogether.domain.member.entity.Member;
import com.votogether.global.exception.ExceptionResponse;
import com.votogether.global.jwt.Auth;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.PositiveOrZero;
import java.util.List;
import org.springframework.http.ResponseEntity;

@Tag(name = "알림 조회", description = "알림 조회 API")
public interface AlarmQueryControllerDocs {

    @Operation(
            summary = "게시글 내역 알림 조회",
            description = "게시글 내역 알림을 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 내역 알림 조회 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "0 이상의 정수가 아닌 페이지",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<List<PostAlarmResponse>> getPostAlarm(
            @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page,
            @Auth final Member loginMember
    );

    @Operation(
            summary = "신고조치알림 조회",
            description = "신고조치알림목록을 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "신고조치알림 조회 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "페이지가 0이상 정수가 아닌 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<List<ReportActionAlarmResponse>> getReportActionAlarms(
            @Parameter(description = "현재 페이지 위치", example = "0")
            @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page,
            final Member member
    );

    @Operation(
            summary = "신고조치알림 상세 조회",
            description = "신고조치알림를 상세 조회한다."
    )
    @ApiResponse(
            responseCode = "201",
            description = "신고조치알림 상세 조회 성공"
    )
    ResponseEntity<ReportActionResponse> getReportActionAlarm(
            @Parameter(description = "신고조치알림 ID", example = "1") final Long reportActionAlarmId,
            final Member member
    );

}
