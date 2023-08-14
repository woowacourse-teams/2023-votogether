package com.votogether.domain.report.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.dto.request.ReportRequest;
import com.votogether.domain.report.service.ReportService;
import com.votogether.global.jwt.Auth;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ReportController implements ReportControllerDocs {

    private final ReportService reportService;

    @PostMapping("/report")
    public ResponseEntity<Void> report(@Valid @RequestBody final ReportRequest request, @Auth final Member member) {
        reportService.report(member, request);
        return ResponseEntity.ok().build();
    }

}
