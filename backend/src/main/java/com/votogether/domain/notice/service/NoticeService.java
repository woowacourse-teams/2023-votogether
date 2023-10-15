package com.votogether.domain.notice.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.notice.dto.request.NoticeRequest;
import com.votogether.domain.notice.dto.response.NoticePageResponse;
import com.votogether.domain.notice.dto.response.NoticeResponse;
import com.votogether.domain.notice.entity.Notice;
import com.votogether.domain.notice.repository.NoticeRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class NoticeService {

    private static final int DEFAULT_PAGE_SIZE = 10;

    private final NoticeRepository noticeRepository;

    @Transactional(readOnly = true)
    public NoticeResponse getProgressNotice() {
        final LocalDateTime now = LocalDateTime.now();
        final Optional<Notice> notice = noticeRepository.findFirstByDeadlineAfterOrderByCreatedAtDesc(now);
        if (notice.isPresent()) {
            return NoticeResponse.from(notice.get());
        }
        return new NoticeResponse(null, null, null, null, null, null, null, null);
    }

    @Transactional(readOnly = true)
    public NoticePageResponse getNotices(final int page) {
        final Pageable pageable = PageRequest.of(page, DEFAULT_PAGE_SIZE);
        final List<Notice> notices = noticeRepository.findAllByOrderByCreatedAtDesc(pageable);
        final long noticeTotalCount = noticeRepository.count();
        return NoticePageResponse.of(calculateTotalPage(noticeTotalCount), page, notices);
    }

    private int calculateTotalPage(final long noticeTotalCount) {
        int totalPage = (int) (noticeTotalCount / DEFAULT_PAGE_SIZE);
        if (noticeTotalCount % DEFAULT_PAGE_SIZE > 0) {
            totalPage += 1;
        }
        return totalPage;
    }

    @Transactional
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
