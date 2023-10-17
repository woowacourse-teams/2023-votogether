package com.votogether.domain.notice.service;

import com.votogether.domain.notice.dto.response.NoticePageResponse;
import com.votogether.domain.notice.dto.response.NoticeResponse;
import com.votogether.domain.notice.entity.Notice;
import com.votogether.domain.notice.exception.NoticeExceptionType;
import com.votogether.domain.notice.repository.NoticeRepository;
import com.votogether.global.exception.NotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class NoticeQueryService {

    private static final int DEFAULT_PAGE_SIZE = 10;

    private final NoticeRepository noticeRepository;

    public NoticeResponse getProgressNotice() {
        final LocalDateTime now = LocalDateTime.now();
        final Optional<Notice> notice = noticeRepository.findFirstByDeadlineAfterOrderByCreatedAtDesc(now);
        if (notice.isPresent()) {
            return NoticeResponse.from(notice.get());
        }
        return NoticeResponse.empty();
    }

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

    public NoticeResponse getNotice(final Long noticeId) {
        final Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new NotFoundException(NoticeExceptionType.NOT_FOUND));
        return NoticeResponse.from(notice);
    }

}
