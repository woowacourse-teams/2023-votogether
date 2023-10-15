package com.votogether.domain.notice.repository;

import com.votogether.domain.notice.entity.Notice;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    Optional<Notice> findFirstByDeadlineAfterOrderByCreatedAtDesc(final LocalDateTime now);

    List<Notice> findAllByOrderByCreatedAtDesc(final Pageable pageable);

}
