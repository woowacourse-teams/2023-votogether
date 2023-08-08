package com.votogether.domain.report.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.dto.ReportRequest;
import com.votogether.domain.report.service.ReportService;
import com.votogether.global.jwt.Auth;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ReportController {

    private final ReportService reportService;

    @Operation(summary = "신고 기능", description = "게시글, 댓글, 닉네임을 신고한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "신고 성공"),
            @ApiResponse(responseCode = "400", description = "올바르지 않은 요청"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 신고 대상")
    })
    @PostMapping("/report")
    public ResponseEntity<Void> report(@Valid @RequestBody final ReportRequest request, @Auth final Member member) {
        reportService.report(member, request);
        return ResponseEntity.ok().build();
    }

}
