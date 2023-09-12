package com.votogether.domain.member.repository;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.vo.Nickname;
import com.votogether.domain.member.entity.vo.SocialType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findBySocialIdAndSocialType(final String socialId, final SocialType socialType);

    boolean existsByNickname(final Nickname nickname);

}
