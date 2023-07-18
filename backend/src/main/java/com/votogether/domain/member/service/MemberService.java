package com.votogether.domain.member.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public Member register(final Member member) {
        final Optional<Member> maybeMember = memberRepository.findBySocialIdAndSocialType(member.getSocialId(),
                member.getSocialType());
        return maybeMember.orElseGet(() -> memberRepository.save(member));
    }

    public Member findById(final Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 Id를 가지 회원은 존재하지 않습니다."));
    }

}
