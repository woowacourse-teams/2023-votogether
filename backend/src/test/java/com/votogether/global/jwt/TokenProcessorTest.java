package com.votogether.global.jwt;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.vo.Gender;
import com.votogether.domain.member.entity.vo.SocialType;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.test.RepositoryTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

@Import(TokenProcessor.class)
class TokenProcessorTest extends RepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    TokenProcessor tokenProcessor;

    @Test
    @DisplayName("토큰을 생성한다.")
    void generateToken() throws Exception {
        // given
        Member member = Member.builder()
                .nickname("저문")
                .gender(Gender.MALE)
                .birthYear(1966)
                .socialId("abc123")
                .socialType(SocialType.KAKAO)
                .build();

        memberRepository.save(member);

        // when
        String token = tokenProcessor.generateAccessToken(member.getId());

        // then
        TokenPayload tokenPayload = tokenProcessor.parseToken(token);
        assertThat(tokenPayload.memberId()).isEqualTo(member.getId());
    }

    @Nested
    @DisplayName("토큰의 prefix를 제외한 값을 추출할 때")
    class ResolveToken {

        @Test
        @DisplayName("Bearer가 prefix면 성공한다.")
        void resolveTokenSuccess() throws JsonProcessingException {
            // given
            Member member = Member.builder()
                    .nickname("저문")
                    .gender(Gender.MALE)
                    .birthYear(1966)
                    .socialId("abc123")
                    .socialType(SocialType.KAKAO)
                    .build();
            memberRepository.save(member);

            String token = tokenProcessor.generateAccessToken(member.getId());
            token = "Bearer " + token;

            // when
            String resolvedToken = tokenProcessor.resolveToken(token);

            // then
            TokenPayload tokenPayload = tokenProcessor.parseToken(resolvedToken);
            assertThat(tokenPayload.memberId()).isEqualTo(member.getId());
        }

        @ParameterizedTest
        @ValueSource(strings = {"Bear", "Barrier", "Baerer", "bearer"})
        @DisplayName("Bearer가 아닌 다른 prefix라면 예외를 발생시킨다.")
        void resolveTokenFail(String prefix) {
            // given
            Member member = Member.builder()
                    .nickname("저문")
                    .gender(Gender.MALE)
                    .birthYear(1966)
                    .socialId("abc123")
                    .socialType(SocialType.KAKAO)
                    .build();
            memberRepository.save(member);

            String token = prefix + tokenProcessor.generateAccessToken(member.getId());

            // when, then
            assertThatThrownBy(() -> tokenProcessor.resolveToken(token))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("올바르지 않은 토큰입니다.");
        }

    }

}
