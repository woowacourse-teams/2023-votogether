package com.votogether.domain.notice.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.notice.dto.request.NoticeRequest;
import com.votogether.domain.notice.dto.response.NoticePageResponse;
import com.votogether.domain.notice.dto.response.NoticeResponse;
import com.votogether.domain.notice.entity.Notice;
import com.votogether.domain.notice.repository.NoticeRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import com.votogether.test.ServiceTest;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;

class NoticeServiceTest extends ServiceTest {

    @Autowired
    NoticeService noticeService;

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
            NoticeResponse noticeResponse = noticeService.getProgressNotice();

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
            NoticeResponse noticeResponse = noticeService.getProgressNotice();

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
            NoticePageResponse response = noticeService.getNotices(0);

            // then
            NoticePageResponse expected = NoticePageResponse.of(1, 0, List.of(savedNoticeB, savedNoticeA));
            assertThat(response).usingRecursiveComparison().isEqualTo(expected);
        }

        @Test
        @DisplayName("공지사항이 존재하지 않으면 빈 목록을 응답한다.")
        void emptyNotices() {
            // given, when
            NoticePageResponse response = noticeService.getNotices(0);

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
            NoticeResponse result = noticeService.getNotice(savedNotice.getId());

            // then
            NoticeResponse expected = NoticeResponse.from(savedNotice);
            assertThat(result).usingRecursiveComparison().isEqualTo(expected);
        }

        @Test
        @DisplayName("존재하지 않은 공지사항이라면 예외를 던진다.")
        void notFoundNotice() {
            // given, when, then
            assertThatThrownBy(() -> noticeService.getNotice(-1L))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("공지사항이 존재하지 않습니다.");
        }

    }

    @Nested
    @DisplayName("공지사항 생성 시")
    class CreateNotice {

        @Test
        @DisplayName("정상적인 요청이라면 공지사항을 생성한다.")
        void createNotice() {
            // given
            Member member = memberTestPersister.builder().save();
            NoticeRequest noticeRequest = new NoticeRequest(
                    "title",
                    null,
                    null,
                    "content",
                    LocalDateTime.now()
            );

            // when
            Long noticeId = noticeService.createNotice(noticeRequest, member);

            // then
            assertThat(noticeRepository.findById(noticeId)).isPresent();
        }

        @ParameterizedTest
        @NullAndEmptySource
        @DisplayName("공지사항 제목이 존재하지 않거나 공백이라면 예외를 던진다.")
        void nullAndEmptyTitle(String title) {
            // given
            Member member = memberTestPersister.builder().save();
            NoticeRequest noticeRequest = new NoticeRequest(
                    title,
                    null,
                    null,
                    "content",
                    LocalDateTime.now()
            );

            // when, then
            assertThatThrownBy(() -> noticeService.createNotice(noticeRequest, member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("공지사항 제목이 존재하지 않거나 공백입니다.");
        }

        @Test
        @DisplayName("공지사항 제목의 길이가 유효하지 않으면 예외를 던진다.")
        void invalidLengthTitle() {
            // given
            Member member = memberTestPersister.builder().save();
            NoticeRequest noticeRequest = new NoticeRequest(
                    "a".repeat(101),
                    null,
                    null,
                    "content",
                    LocalDateTime.now()
            );

            // when, then
            assertThatThrownBy(() -> noticeService.createNotice(noticeRequest, member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("공지사항 제목의 길이가 유효하지 않습니다.");
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " "})
        @DisplayName("공지사항 배너 제목이 공백이라면 예외를 던진다.")
        void emptyBannerTitle(String bannerTitle) {
            // given
            Member member = memberTestPersister.builder().save();
            NoticeRequest noticeRequest = new NoticeRequest(
                    "title",
                    bannerTitle,
                    null,
                    "content",
                    LocalDateTime.now()
            );

            // when, then
            assertThatThrownBy(() -> noticeService.createNotice(noticeRequest, member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("공지사항 배너 제목이 공백으로 이루어져 있습니다.");
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " "})
        @DisplayName("공지사항 배너 부제목이 공백이라면 예외를 던진다.")
        void emptyBannerSubtitle(String bannerSubtitle) {
            // given
            Member member = memberTestPersister.builder().save();
            NoticeRequest noticeRequest = new NoticeRequest(
                    "title",
                    null,
                    bannerSubtitle,
                    "content",
                    LocalDateTime.now()
            );

            // when, then
            assertThatThrownBy(() -> noticeService.createNotice(noticeRequest, member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("공지사항 배너 제목이 공백으로 이루어져 있습니다.");
        }

        @ParameterizedTest
        @NullAndEmptySource
        @DisplayName("공지사항 내용이 존재하지 않거나 공백이라면 예외를 던진다.")
        void nullAndEmptyContent(String content) {
            // given
            Member member = memberTestPersister.builder().save();
            NoticeRequest noticeRequest = new NoticeRequest(
                    "title",
                    null,
                    null,
                    content,
                    LocalDateTime.now()
            );

            // when, then
            assertThatThrownBy(() -> noticeService.createNotice(noticeRequest, member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("공지사항 내용이 존재하지 않거나 공백입니다.");
        }

        @Test
        @DisplayName("공지사항 내용의 길이가 유효하지 않으면 예외를 던진다.")
        void invalidLengthContent() {
            // given
            Member member = memberTestPersister.builder().save();
            NoticeRequest noticeRequest = new NoticeRequest(
                    "title",
                    null,
                    null,
                    "a".repeat(3001),
                    LocalDateTime.now()
            );

            // when, then
            assertThatThrownBy(() -> noticeService.createNotice(noticeRequest, member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("공지사항 내용의 길이가 유효하지 않습니다.");
        }

        @Test
        @DisplayName("공지사항 배너 제목의 길이가 유효하지 않으면 예외를 던진다.")
        void invalidLengthBannerTitle() {
            // given
            Member member = memberTestPersister.builder().save();
            NoticeRequest noticeRequest = new NoticeRequest(
                    "title",
                    "a".repeat(101),
                    null,
                    "content",
                    LocalDateTime.now()
            );

            // when, then
            assertThatThrownBy(() -> noticeService.createNotice(noticeRequest, member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("공지사항 배너 제목의 길이가 유효하지 않습니다.");
        }

        @Test
        @DisplayName("공지자항 배너 부제목의 길이가 유효하지 않으면 예외를 던진다.")
        void invalidLengthBannerSubtitle() {
            // given
            Member member = memberTestPersister.builder().save();
            NoticeRequest noticeRequest = new NoticeRequest(
                    "title",
                    null,
                    "a".repeat(101),
                    "content",
                    LocalDateTime.now()
            );

            // when, then
            assertThatThrownBy(() -> noticeService.createNotice(noticeRequest, member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("공지사항 배너 제목의 길이가 유효하지 않습니다.");
        }

    }

    @Nested
    @DisplayName("공지사항 수정 시")
    class UpdateNotice {

        @Test
        @DisplayName("정상적인 요청이라면 공지사항을 수정한다.")
        void updateNotice() {
            // given
            Member member = memberTestPersister.builder().save();
            Notice notice = Notice.builder()
                    .member(member)
                    .title("title")
                    .content("content")
                    .deadline(LocalDateTime.now())
                    .build();
            Notice savedNotice = noticeRepository.save(notice);
            NoticeRequest noticeRequest = new NoticeRequest(
                    "updateTitle",
                    "updateBannerTitle",
                    "updateBannerSubtitle",
                    "updateContent",
                    LocalDateTime.now().plusDays(1)
            );

            // when
            noticeService.updateNotice(savedNotice.getId(), noticeRequest);

            // then
            assertSoftly(softly -> {
                softly.assertThat(savedNotice.getTitle()).isEqualTo(noticeRequest.title());
                softly.assertThat(savedNotice.getBannerTitle()).isEqualTo(noticeRequest.bannerTitle());
                softly.assertThat(savedNotice.getBannerSubtitle()).isEqualTo(noticeRequest.bannerSubtitle());
                softly.assertThat(savedNotice.getContent()).isEqualTo(noticeRequest.content());
                softly.assertThat(savedNotice.getDeadline()).isEqualTo(noticeRequest.deadline());
            });
        }

        @Test
        @DisplayName("공지사항이 존재하지 않으면 예외를 던진다.")
        void notFoundNotice() {
            // given
            NoticeRequest noticeRequest = new NoticeRequest(
                    "updateTitle",
                    "updateBannerTitle",
                    "updateBannerSubtitle",
                    "updateContent",
                    LocalDateTime.now().plusDays(1)
            );

            // when, then
            assertThatThrownBy(() -> noticeService.updateNotice(-1L, noticeRequest))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("공지사항이 존재하지 않습니다.");
        }

    }

    @Test
    @DisplayName("공지사항을 삭제한다.")
    void deleteNotice() {
        // given
        Member member = memberTestPersister.builder().save();
        Notice notice = Notice.builder()
                .member(member)
                .title("title")
                .content("content")
                .deadline(LocalDateTime.now())
                .build();
        Notice savedNotice = noticeRepository.save(notice);

        // when
        noticeService.deleteNotice(savedNotice.getId());

        // then
        assertThat(noticeRepository.findById(savedNotice.getId())).isNotPresent();
    }

}
