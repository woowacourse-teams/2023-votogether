package com.votogether.domain.member.repository;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.MemberCategory;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberCategoryRepository extends JpaRepository<MemberCategory, Long> {
    Optional<MemberCategory> findByMemberAndCategory(final Member member, final Category category);

}
