package com.votogether.domain.report.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.dto.ReportRequest;
import com.votogether.domain.report.service.ReportService;
import com.votogether.global.jwt.Auth;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ReportController {

    private final ReportService reportService;

    @PostMapping("/report")
    public ResponseEntity<Void> report(@Auth final Member member, final ReportRequest request) {
        reportService.report(member, request);
        return ResponseEntity.ok().build();
    }

}
