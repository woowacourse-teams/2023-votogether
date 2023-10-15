package com.votogether.domain.member.repository;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.MemberMetric;
import jakarta.persistence.LockModeType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberMetricRepository extends JpaRepository<MemberMetric, Long>, MemberMetricCustomRepository {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT mm FROM MemberMetric mm where mm.member.id = :memberId")
    Optional<MemberMetric> findByMemberIdForUpdate(@Param("memberId") final Long memberId);

    Optional<MemberMetric> findByMember(final Member member);

    long countByScoreGreaterThan(final long score);

    void deleteByMember(final Member member);

}
