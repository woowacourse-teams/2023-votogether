package com.votogether.domain.notice.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.notice.dto.response.NoticePageResponse;
import com.votogether.domain.notice.dto.response.NoticeResponse;
import com.votogether.domain.notice.entity.Notice;
import com.votogether.domain.notice.repository.NoticeRepository;
import com.votogether.global.exception.NotFoundException;
import com.votogether.test.ServiceTest;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class NoticeQueryServiceTest extends ServiceTest {

    @Autowired
    NoticeQueryService noticeQueryService;

    @Autowired
    NoticeRepository noticeRepository;

    @Nested
    @DisplayName("배너 공지사항 조회 시")
    class GetProgressNotice {

        @Test
        @DisplayName("유효한 배너 공지사항이 존재하면 공지사항 응답을 반환한다.")
        void getProgressNotice() {
            // given
            Member member = memberTestPersister.builder().save();
            Notice notice = Notice.builder()
                    .member(member)
                    .title("title")
                    .content("content")
                    .deadline(LocalDateTime.now().plusDays(1))
                    .build();
            Notice savedNotice = noticeRepository.save(notice);

            // when
            NoticeResponse noticeResponse = noticeQueryService.getProgressNotice();

            // then
            NoticeResponse expected = NoticeResponse.from(savedNotice);
            assertThat(noticeResponse).usingRecursiveComparison().isEqualTo(expected);
        }

        @Test
        @DisplayName("유효한 배너 공지사항이 존재하지 않으면 null 필드로 채워진 응답을 반환한다.")
        void nullNotice() {
            // given
            Member member = memberTestPersister.builder().save();
            Notice notice = Notice.builder()
                    .member(member)
                    .title("title")
                    .content("content")
                    .deadline(LocalDateTime.now().minusDays(1))
                    .build();
            noticeRepository.save(notice);

            // when
            NoticeResponse noticeResponse = noticeQueryService.getProgressNotice();

            // then
            NoticeResponse expected = NoticeResponse.empty();
            assertThat(noticeResponse).usingRecursiveComparison().isEqualTo(expected);
        }

    }

    @Nested
    @DisplayName("공지사항 목록 최근순으로 페이징 조회 시")
    class GetNotices {

        @Test
        @DisplayName("전체 페이지 개수도 함께 응답한다.")
        void getTotalPageNumber() {
            // given
            Member member = memberTestPersister.builder().save();
            Notice noticeA = Notice.builder()
                    .member(member)
                    .title("title")
                    .content("content")
                    .deadline(LocalDateTime.now())
                    .build();
            Notice noticeB = Notice.builder()
                    .member(member)
                    .title("title")
                    .content("content")
                    .deadline(LocalDateTime.now())
                    .build();
            Notice savedNoticeA = noticeRepository.save(noticeA);
            Notice savedNoticeB = noticeRepository.save(noticeB);

            // when
            NoticePageResponse response = noticeQueryService.getNotices(0);

            // then
            NoticePageResponse expected = NoticePageResponse.of(1, 0, List.of(savedNoticeB, savedNoticeA));
            assertThat(response).usingRecursiveComparison().isEqualTo(expected);
        }

        @Test
        @DisplayName("공지사항이 존재하지 않으면 빈 목록을 응답한다.")
        void emptyNotices() {
            // given, when
            NoticePageResponse response = noticeQueryService.getNotices(0);

            // then
            NoticePageResponse expected = NoticePageResponse.of(0, 0, Collections.emptyList());
            assertThat(response).usingRecursiveComparison().isEqualTo(expected);
        }

    }

    @Nested
    @DisplayName("공지사항 상세 조회 시")
    class GetNotice {

        @Test
        @DisplayName("정상적인 요청이라면 공지사항 상세 정보를 응답한다.")
        void getNotice() {
            // given
            Member member = memberTestPersister.builder().save();
            Notice notice = Notice.builder()
                    .member(member)
                    .title("title")
                    .content("content")
                    .deadline(LocalDateTime.now().minusDays(1))
                    .build();
            Notice savedNotice = noticeRepository.save(notice);

            // when
            NoticeResponse result = noticeQueryService.getNotice(savedNotice.getId());

            // then
            NoticeResponse expected = NoticeResponse.from(savedNotice);
            assertThat(result).usingRecursiveComparison().isEqualTo(expected);
        }

        @Test
        @DisplayName("존재하지 않은 공지사항이라면 예외를 던진다.")
        void notFoundNotice() {
            // given, when, then
            assertThatThrownBy(() -> noticeQueryService.getNotice(-1L))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("공지사항이 존재하지 않습니다.");
        }

    }

}
