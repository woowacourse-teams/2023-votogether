package com.votogether.domain.member.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.vo.Nickname;
import com.votogether.test.RepositoryTest;
import com.votogether.test.fixtures.MemberFixtures;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class MemberRepositoryTest extends RepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    @Nested
    @DisplayName("회원 닉네임을 받아서 존재하는 회원이라면")
    class existByNickname {

        @Test
        @DisplayName("true를 반환한다.")
        void ExistByNickname() {
            // given
            Member savedMember = memberRepository.save(MemberFixtures.MALE_20.get());

            // when
            boolean isExist = memberRepository.existsByNickname(new Nickname(savedMember.getNickname()));

            // then
            assertThat(isExist).isTrue();
        }

        @Test
        @DisplayName("false를 반환한다.")
        void existsByNicknameFalse() {
            // given
            Nickname nonExistentNickname = new Nickname("jeomxon");

            // when
            boolean isExist = memberRepository.existsByNickname(nonExistentNickname);

            // then
            assertThat(isExist).isFalse();
        }

    }

}
