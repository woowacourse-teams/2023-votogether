package com.votogether.domain.report.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.dto.request.ReportRequest;
import com.votogether.global.exception.ExceptionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "신고", description = "신고 API")
public interface ReportControllerDocs {

    @Operation(summary = "신고", description = "게시글, 댓글, 닉네임을 신고한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "신고 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "올바르지 않은 요청",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 신고 대상",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> report(final ReportRequest request, final Member member);

}