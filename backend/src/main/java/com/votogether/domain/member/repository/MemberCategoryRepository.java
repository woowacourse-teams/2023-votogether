package com.votogether.domain.member.repository;

import com.votogether.domain.member.entity.MemberCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberCategoryRepository extends JpaRepository<MemberCategory, Long> {
}
