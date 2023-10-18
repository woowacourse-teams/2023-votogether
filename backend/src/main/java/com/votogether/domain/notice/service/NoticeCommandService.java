package com.votogether.domain.notice.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.notice.dto.request.NoticeRequest;
import com.votogether.domain.notice.entity.Notice;
import com.votogether.domain.notice.entity.vo.BannerTitle;
import com.votogether.domain.notice.entity.vo.Detail;
import com.votogether.domain.notice.exception.NoticeExceptionType;
import com.votogether.domain.notice.repository.NoticeRepository;
import com.votogether.global.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class NoticeCommandService {

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

    public void updateNotice(final Long noticeId, final NoticeRequest noticeRequest) {
        final Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new NotFoundException(NoticeExceptionType.NOT_FOUND));
        notice.update(
                new Detail(noticeRequest.title(), noticeRequest.content()),
                new BannerTitle(noticeRequest.bannerTitle(), noticeRequest.bannerSubtitle()),
                noticeRequest.deadline()
        );
    }

    public void deleteNotice(final Long noticeId) {
        noticeRepository.deleteById(noticeId);
    }

}
