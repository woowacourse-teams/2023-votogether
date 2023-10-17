package com.votogether.domain.notice.controller;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.notice.dto.request.NoticeRequest;
import com.votogether.domain.notice.service.NoticeCommandService;
import com.votogether.global.jwt.Auth;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RequiredArgsConstructor
@RequestMapping("/notices")
@RestController
public class NoticeCommandController implements NoticeCommandControllerDocs {

    private final NoticeCommandService noticeCommandService;

    @PostMapping
    public ResponseEntity<Void> createNotice(
            @RequestBody @Valid final NoticeRequest noticeRequest,
            @Auth final Member loginMember
    ) {
        final Long noticeId = noticeCommandService.createNotice(noticeRequest, loginMember);
        return ResponseEntity.created(URI.create("/notices/" + noticeId)).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateNotice(
            @PathVariable("id") @Positive(message = "공지사항 ID는 양수만 가능합니다.") final Long noticeId,
            @RequestBody @Valid final NoticeRequest noticeRequest
    ) {
        noticeCommandService.updateNotice(noticeId, noticeRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotice(
            @PathVariable("id") @Positive(message = "공지사항 ID는 양수만 가능합니다.") final Long noticeId
    ) {
        noticeCommandService.deleteNotice(noticeId);
        return ResponseEntity.noContent().build();
    }

}
