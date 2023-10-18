package com.votogether.domain.report.controller;

import com.votogether.domain.report.dto.response.ReportPageResponse;
import com.votogether.global.exception.ExceptionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.http.ResponseEntity;

@Tag(name = "신고 조회", description = "신고 조회 API")
public interface ReportQueryControllerDocs {

    @Operation(summary = "신고 조치 예정 목록 조회", description = "신고 조치 예정 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "신고 조치 예정 목록 조회 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "0이상의 정수가 아닌 페이지",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<ReportPageResponse> getReports(
            @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page
    );

}
