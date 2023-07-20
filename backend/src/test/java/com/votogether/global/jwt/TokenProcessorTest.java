package com.votogether.global.jwt;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.votogether.RepositoryTest;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.domain.member.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;

@RepositoryTest
class TokenProcessorTest {

    @Autowired
    private MemberRepository memberRepository;

    private TokenProcessor tokenProcessor;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        String secretKey = "abcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd";
        int expirationTime = 100000;
        tokenProcessor = new TokenProcessor(
                secretKey,
                expirationTime,
                objectMapper
        );
    }

    @Test
    @DisplayName("토큰을 생성한다.")
    void generateToken() throws Exception {
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

        memberRepository.save(member);

        // when
        String token = tokenProcessor.generateToken(member);

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
                    .ageRange("20~29")
                    .birthday("0101")
                    .socialType(SocialType.KAKAO)
                    .socialId("123123")
                    .point(0)
                    .build();
            memberRepository.save(member);

            String token = tokenProcessor.generateToken(member);
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
                    .ageRange("20~29")
                    .birthday("0101")
                    .socialType(SocialType.KAKAO)
                    .socialId("123123")
                    .point(0)
                    .build();
            memberRepository.save(member);

            String token = prefix + tokenProcessor.generateToken(member);

            // when, then
            assertThatThrownBy(() -> tokenProcessor.resolveToken(token))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessage("올바르지 않은 토큰입니다.");
        }

    }

}
