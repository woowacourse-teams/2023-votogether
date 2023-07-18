package com.votogether.domain.member.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MemberServiceTest {

    @Autowired
    MemberService memberService;

    @Test
    @DisplayName("멤버가 존재하지 않으면 저장한다.")
    void register() {
        // given
        Member member = Member.builder()
                .nickname("저문")
                .gender(Gender.MALE)
                .ageRange("20~29")
                .birthday("0101")
                .socialType(SocialType.KAKAO)
                .socialId("123123")
                .point(0)
                .build();

        // when
        Member registeredMember = memberService.register(member);

        // then
        assertThat(registeredMember.getSocialId()).isEqualTo("123123");
    }

}
