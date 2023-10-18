package com.votogether.domain.auth.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.votogether.domain.auth.dto.request.AccessTokenRequest;
import com.votogether.domain.auth.service.dto.ReissuedTokenDto;
import com.votogether.domain.auth.service.oauth.KakaoOAuthClient;
import com.votogether.domain.member.service.MemberService;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.jwt.TokenProcessor;
import com.votogether.global.log.context.LogContext;
import com.votogether.test.config.RedisTestConfig;
import java.util.Objects;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.redis.core.RedisTemplate;

@Import(RedisTestConfig.class)
@SpringBootTest
class AuthServiceTest {

    @Autowired
    AuthService authService;

    @Autowired
    KakaoOAuthClient kakaoOAuthClient;

    @Autowired
    MemberService memberService;

    @Autowired
    TokenProcessor tokenProcessor;

    @Autowired
    RedisTemplate<String, Long> redisTemplate;

    @MockBean
    LogContext logContext;

    @Nested
    @DisplayName("인증 토큰을 재발급 받을 때")
    class ReissueAuthToken {

        @AfterEach
        void tearDown() {
            Objects.requireNonNull(redisTemplate.getConnectionFactory()).getConnection().serverCommands().flushAll();
        }

        @Test
        @DisplayName("정상적으로 인증 토큰을 재발급한다.")
        void success() {
            // given
            Long memberId = 1L;
            String accessToken = tokenProcessor.generateAccessToken(memberId);
            String refreshToken = tokenProcessor.generateRefreshToken(memberId);
            AccessTokenRequest request = new AccessTokenRequest(accessToken);

            redisTemplate.opsForValue().set(refreshToken, memberId);

            // when
            ReissuedTokenDto reissuedTokenDto = authService.reissueAuthToken(request, refreshToken);

            // then
            Long savedMemberId = redisTemplate.opsForValue().get(reissuedTokenDto.refreshToken());
            Long dbSize = Objects.requireNonNull(redisTemplate.getConnectionFactory())
                    .getConnection()
                    .serverCommands()
                    .dbSize();

            assertSoftly(softly -> {
                        softly.assertThat(memberId).isEqualTo(savedMemberId);
                        softly.assertThat(dbSize).isEqualTo(1L);
                    }
            );
        }

        @Test
        @DisplayName("인증 토큰과 갱신 토큰의 회원 아이디가 다르면 예외가 발생한다.")
        void throwsExceptionWhenInformationOfAccessAndRefresh() {
            // given
            Long accessTokenMemberId = 1L;
            Long refreshTokenMemberId = 2L;
            String accessToken = tokenProcessor.generateAccessToken(accessTokenMemberId);
            String refreshToken = tokenProcessor.generateRefreshToken(refreshTokenMemberId);
            AccessTokenRequest request = new AccessTokenRequest(accessToken);

            redisTemplate.opsForValue().set(refreshToken, refreshTokenMemberId);

            // when, then
            assertThatThrownBy(() -> authService.reissueAuthToken(request, refreshToken))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("토큰 간의 정보가 일치하지 않습니다.");
        }

    }

    @Nested
    @DisplayName("갱신 토큰을 삭제할 때")
    class DeleteRefreshToken {

        @Test
        @DisplayName("정상적으로 삭제한다.")
        void deleteRefreshToken() {
            // given
            Long memberId = 3L;
            String refreshToken = "ihg.fed.cba";
            redisTemplate.opsForValue().set(refreshToken, memberId);

            // when
            authService.deleteRefreshToken(refreshToken);

            // then
            assertThat(redisTemplate.keys(refreshToken)).isEmpty();
        }

    }

}
