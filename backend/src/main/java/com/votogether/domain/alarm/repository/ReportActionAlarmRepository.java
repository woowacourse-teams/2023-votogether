package com.votogether.domain.alarm.repository;

import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.member.entity.Member;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportActionAlarmRepository extends JpaRepository<ReportActionAlarm, Long> {

    List<ReportActionAlarm> findByMember(final Member member, final Pageable pageable);

}
