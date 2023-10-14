package com.votogether.domain.alarm.repository;

import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.member.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportActionAlarmRepository extends JpaRepository<ReportActionAlarm, Long> {

    List<ReportActionAlarm> findByMember(final Member member, final Pageable pageable);

}
