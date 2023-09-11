package com.votogether.domain.auth.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.domain.auth.RefreshToken;
import com.votogether.domain.auth.dto.request.AccessTokenRequest;
import com.votogether.domain.auth.repository.RefreshTokenRepository;
import com.votogether.domain.auth.service.dto.TokenResponse;
import com.votogether.domain.auth.service.oauth.KakaoOAuthClient;
import com.votogether.domain.member.service.MemberService;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import com.votogether.global.jwt.TokenProcessor;
import com.votogether.test.config.RedisTestConfig;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

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
    RefreshTokenRepository refreshTokenRepository;

    @Nested
    @DisplayName("인증 토큰을 재발급 받을 때")
    class ReissueAuthToken {

        @AfterEach
        void tearDown() {
            refreshTokenRepository.deleteAll();
        }

        @Test
        @DisplayName("정상적으로 인증 토큰을 재발급한다.")
        void success() throws Exception {
            // given
            Long memberId = 1L;
            String accessToken = tokenProcessor.generateAccessToken(memberId);
            String refreshToken = tokenProcessor.generateRefreshToken(memberId);
            AccessTokenRequest request = new AccessTokenRequest(accessToken);

            RefreshToken refreshTokenObject = new RefreshToken(refreshToken, memberId);
            refreshTokenRepository.save(refreshTokenObject);

            // when
            TokenResponse tokenResponse = authService.reissueAuthToken(request, refreshToken);

            // then
            RefreshToken savedRefreshToken = refreshTokenRepository.findById(tokenResponse.refreshToken()).get();
            assertThat(tokenResponse.refreshToken()).isEqualTo(savedRefreshToken.refreshToken());
        }

        @Test
        @DisplayName("갱신 토큰이 저장되어 있지 않다면 예외가 발생한다.")
        void throwsExceptionWhenNonSavedRefreshToken() {
            // given
            Long memberId = 1L;
            String accessToken = tokenProcessor.generateAccessToken(memberId);
            String refreshToken = tokenProcessor.generateRefreshToken(memberId);
            AccessTokenRequest request = new AccessTokenRequest(accessToken);

            // when, then
            assertThatThrownBy(() -> authService.reissueAuthToken(request, refreshToken))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("갱신 토큰이 존재하지 않습니다.");
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

            RefreshToken refreshTokenObject = new RefreshToken(refreshToken, refreshTokenMemberId);
            refreshTokenRepository.save(refreshTokenObject);

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
            refreshTokenRepository.save(new RefreshToken(refreshToken, memberId));

            // when
            authService.deleteRefreshToken(refreshToken);

            // then
            assertThat(refreshTokenRepository.count()).isZero();
        }

        @Test
        @DisplayName("갱신 토큰이 존재하지 않으면 예외가 발생한다.")
        void failRefresh() {
            // given
            Long memberId = 5L;
            String refreshToken = "iII.fed.cba";
            refreshTokenRepository.save(new RefreshToken(refreshToken, memberId));

            String invalidRefreshToken = "iIi.fed.cba";

            // when
            assertThatThrownBy(() -> authService.deleteRefreshToken(invalidRefreshToken))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("갱신 토큰이 존재하지 않습니다.");
        }

    }

}
