package com.votogether.domain.member.entity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.domain.member.entity.vo.Gender;
import com.votogether.domain.member.entity.vo.SocialType;
import com.votogether.global.exception.BadRequestException;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

class MemberTest {

    @Nested
    @DisplayName("닉네임을 주기에 따라 변경하는 경우")
    class ChangeNicknameByCycle {

        @Test
        @DisplayName("15일전에 변경된 닉네임은 14일 주기로 변경할 때 성공적으로 변경된다.")
        void success() {
            // given
            Member member = Member.builder()
                    .nickname("저문")
                    .gender(Gender.MALE)
                    .birthYear(1966)
                    .socialId("abc123")
                    .socialType(SocialType.KAKAO)
                    .build();

            LocalDateTime now = LocalDateTime.now().minusDays(15L);
            ReflectionTestUtils.setField(member, "createdAt", now);
            ReflectionTestUtils.setField(member, "updatedAt", now.plusHours(1L));

            // when
            member.changeNicknameByCycle("저라니", 14L);

            // then
            assertThat(member.getNickname()).isEqualTo("저라니");
        }

        @Test
        @DisplayName("13일 전에 변경된 닉네임은 14일 주기로 변경하더라도 한번도 닉네임을 변경하지 않았다면 성공적으로 변경된다.")
        void successFirstChange() {
            // given
            Member member = Member.builder()
                    .nickname("익명의손님fFp4vAgX2d")
                    .gender(Gender.MALE)
                    .birthYear(1966)
                    .socialId("abc123")
                    .socialType(SocialType.KAKAO)
                    .build();

            LocalDateTime now = LocalDateTime.now().minusDays(13L);
            ReflectionTestUtils.setField(member, "createdAt", now);
            ReflectionTestUtils.setField(member, "updatedAt", now.plusHours(1L));

            // when
            member.changeNicknameByCycle("저라니", 14L);

            // then
            assertThat(member.getNickname()).isEqualTo("저라니");
        }

        @Test
        @DisplayName("13일 전에 변경된 닉네임은 14일 주기로 변경할 때 변경에 실패한다.")
        void fail() {
            // given
            Member member = Member.builder()
                    .nickname("저문")
                    .gender(Gender.MALE)
                    .birthYear(1966)
                    .socialId("abc123")
                    .socialType(SocialType.KAKAO)
                    .build();

            LocalDateTime createdTime = LocalDateTime.now().minusDays(20L);
            LocalDateTime updatedTime = LocalDateTime.now().minusDays(13L);
            ReflectionTestUtils.setField(member, "createdAt", createdTime);
            ReflectionTestUtils.setField(member, "updatedAt", updatedTime);

            // when, then
            assertThatThrownBy(() -> member.changeNicknameByCycle("저라니", 14L))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("최소 닉네임 변경주기가 지나지 않았습니다.");
        }

    }

}
