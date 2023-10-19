package com.votogether.domain.notice.repository;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.notice.entity.Notice;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    Optional<Notice> findFirstByDeadlineAfterOrderByIdDesc(final LocalDateTime now);

    List<Notice> findAllByOrderByIdDesc(final Pageable pageable);

    List<Notice> findAllByMember(final Member member);

}
