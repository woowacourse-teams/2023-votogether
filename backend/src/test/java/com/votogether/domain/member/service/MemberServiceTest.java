package com.votogether.domain.member.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.ServiceTest;
import com.votogether.domain.member.entity.Member;
import com.votogether.fixtures.MemberFixtures;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@ServiceTest
class MemberServiceTest {

    @Autowired
    MemberService memberService;

    @Test
    @DisplayName("멤버가 존재하지 않으면 저장한다.")
    void register() {
        // given
        Member member = MemberFixtures.FEMALE_20.get();

        // when
        Member registeredMember = memberService.register(member);

        // then
        assertThat(registeredMember.getId()).isNotNull();
    }

}
