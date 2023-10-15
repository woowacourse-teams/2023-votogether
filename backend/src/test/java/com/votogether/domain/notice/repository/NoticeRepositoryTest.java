package com.votogether.domain.notice.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.notice.entity.Notice;
import com.votogether.test.RepositoryTest;
import java.time.LocalDateTime;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class NoticeRepositoryTest extends RepositoryTest {

    @Autowired
    NoticeRepository noticeRepository;

    @Nested
    @DisplayName("가장 최근의 마감기한이 지나지 않은 공지사항 조회 시")
    class FindFirstByDeadlineAfterOrderByCreatedAtDesc {

        @Test
        @DisplayName("가장 최근의 공지사항을 조회한다.")
        void findFirst() {
            // given
            Member member = memberTestPersister.builder().save();
            Notice noticeA = Notice.builder()
                    .member(member)
                    .title("title")
                    .content("content")
                    .deadline(LocalDateTime.now().plusDays(1))
                    .build();
            Notice noticeB = Notice.builder()
                    .member(member)
                    .title("title")
                    .content("content")
                    .deadline(LocalDateTime.now().plusDays(1))
                    .build();
            Notice savedNoticeA = noticeRepository.save(noticeA);
            Notice savedNoticeB = noticeRepository.save(noticeB);

            // when
            Optional<Notice> notice =
                    noticeRepository.findFirstByDeadlineAfterOrderByCreatedAtDesc(LocalDateTime.now());

            // then
            assertSoftly(softly -> {
                softly.assertThat(notice).isPresent();
                softly.assertThat(notice.get()).isEqualTo(savedNoticeB);
            });
        }

        @Test
        @DisplayName("마감기한이 지나지 않은 공지사항을 조회한다.")
        void findDeadlineAfterNow() {
            // given
            Member member = memberTestPersister.builder().save();
            Notice noticeA = Notice.builder()
                    .member(member)
                    .title("title")
                    .content("content")
                    .deadline(LocalDateTime.now().plusDays(1))
                    .build();
            Notice noticeB = Notice.builder()
                    .member(member)
                    .title("title")
                    .content("content")
                    .deadline(LocalDateTime.now().minusDays(1))
                    .build();
            Notice savedNoticeA = noticeRepository.save(noticeA);
            Notice savedNoticeB = noticeRepository.save(noticeB);

            // when
            Optional<Notice> notice =
                    noticeRepository.findFirstByDeadlineAfterOrderByCreatedAtDesc(LocalDateTime.now());

            // then
            assertSoftly(softly -> {
                softly.assertThat(notice).isPresent();
                softly.assertThat(notice.get()).isEqualTo(savedNoticeA);
            });
        }

        @Test
        @DisplayName("마감기한이 지나지 않은 공지사항이 없으면 빈 값을 조회한다.")
        void emptyNotice() {
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
            Optional<Notice> foundNotice =
                    noticeRepository.findFirstByDeadlineAfterOrderByCreatedAtDesc(LocalDateTime.now());

            // then
            assertThat(foundNotice).isNotPresent();
        }

    }

}
