package com.votogether.domain.alarm.repository;

import com.votogether.domain.alarm.entity.Alarm;
import com.votogether.domain.member.entity.Member;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {

    Slice<Alarm> findAllByOrderByCreatedAtDesc(final Pageable pageable);

    List<Alarm> findAllByMember(final Member member);

}
