package com.votogether.domain.notice.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.notice.dto.request.NoticeRequest;
import com.votogether.domain.notice.repository.NoticeRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.test.ServiceTest;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.springframework.beans.factory.annotation.Autowired;

class NoticeServiceTest extends ServiceTest {

    @Autowired
    NoticeService noticeService;

    @Autowired
    NoticeRepository noticeRepository;

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

}
