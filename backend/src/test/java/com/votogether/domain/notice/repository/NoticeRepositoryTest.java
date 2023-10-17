package com.votogether.domain.notice.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.notice.entity.Notice;
import com.votogether.test.RepositoryTest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

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
            Optional<Notice> notice = noticeRepository.findFirstByDeadlineAfterOrderByIdDesc(LocalDateTime.now());

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
            Optional<Notice> notice = noticeRepository.findFirstByDeadlineAfterOrderByIdDesc(LocalDateTime.now());

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
            Optional<Notice> foundNotice = noticeRepository.findFirstByDeadlineAfterOrderByIdDesc(LocalDateTime.now());

            // then
            assertThat(foundNotice).isNotPresent();
        }

    }

    @Nested
    @DisplayName("공지사항 목록 최근순으로 페이징 조회 시")
    class FindAllByOrderByCreatedAtDesc {

        @Test
        @DisplayName("생성시각 내림차순으로 공지사항 목록을 조회한다.")
        void findAllByOrderByCreatedAtDesc() {
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
            Pageable pageable = PageRequest.of(0, 2);
            List<Notice> notices = noticeRepository.findAllByOrderByIdDesc(pageable);

            // then
            assertThat(notices).containsExactly(savedNoticeB, savedNoticeA);
        }

        @Test
        @DisplayName("페이지 크기만큼 공지사항 목록을 조회한다.")
        void findByPage() {
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
            Pageable pageable = PageRequest.of(0, 1);
            List<Notice> notices = noticeRepository.findAllByOrderByIdDesc(pageable);

            // then
            assertThat(notices).containsExactly(savedNoticeB);
        }

    }

}
