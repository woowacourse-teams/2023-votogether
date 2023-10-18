package com.votogether.domain.report.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.dto.request.ReportActionRequest;
import com.votogether.domain.report.dto.request.ReportRequest;
import com.votogether.domain.report.service.ReportCommandService;
import com.votogether.global.jwt.Auth;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ReportCommandController implements ReportCommandControllerDocs {

    private final ReportCommandService reportCommandService;

    @PostMapping("/report")
    public ResponseEntity<Void> report(@Valid @RequestBody final ReportRequest request, @Auth final Member member) {
        reportCommandService.report(member, request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reports/action/admin")
    public ResponseEntity<Void> reportAction(@Valid @RequestBody final ReportActionRequest request) {
        reportCommandService.reportAction(request);
        return ResponseEntity.ok().build();
    }

}
