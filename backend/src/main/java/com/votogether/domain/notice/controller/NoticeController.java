package com.votogether.domain.notice.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.notice.dto.request.NoticeRequest;
import com.votogether.domain.notice.dto.response.NoticePageResponse;
import com.votogether.domain.notice.dto.response.NoticeResponse;
import com.votogether.domain.notice.service.NoticeService;
import com.votogether.global.jwt.Auth;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RequiredArgsConstructor
@RequestMapping("/notices")
@RestController
public class NoticeController implements NoticeControllerDocs {

    private final NoticeService noticeService;

    @GetMapping("/progress")
    public ResponseEntity<NoticeResponse> getProgressNotice() {
        final NoticeResponse response = noticeService.getProgressNotice();
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<NoticePageResponse> getNotices(
            @RequestParam @PositiveOrZero(message = "페이지는 0이상 정수만 가능합니다.") final int page
    ) {
        final NoticePageResponse response = noticeService.getNotices(page);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoticeResponse> getNotice(
            @PathVariable("id") @Positive(message = "공지사항 ID는 양수만 가능합니다.") final Long noticeId
    ) {
        final NoticeResponse response = noticeService.getNotice(noticeId);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Void> createNotice(
            @RequestBody @Valid final NoticeRequest noticeRequest,
            @Auth final Member loginMember
    ) {
        final Long noticeId = noticeService.createNotice(noticeRequest, loginMember);
        return ResponseEntity.created(URI.create("/notices/" + noticeId)).build();
    }

}
