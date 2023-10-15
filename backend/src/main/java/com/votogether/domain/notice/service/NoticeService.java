package com.votogether.domain.notice.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.notice.dto.request.NoticeRequest;
import com.votogether.domain.notice.entity.Notice;
import com.votogether.domain.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public Long createNotice(final NoticeRequest noticeRequest, final Member loginMember) {
        final Notice notice = Notice.builder()
                .member(loginMember)
                .title(noticeRequest.title())
                .bannerTitle(noticeRequest.bannerTitle())
                .bannerSubtitle(noticeRequest.bannerSubtitle())
                .content(noticeRequest.content())
                .deadline(noticeRequest.deadline())
                .build();
        return noticeRepository.save(notice).getId();
    }

}
