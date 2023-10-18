package com.votogether.domain.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.votogether.domain.auth.dto.request.AccessTokenRequest;
import com.votogether.domain.auth.dto.response.KakaoMemberResponse;
import com.votogether.domain.auth.exception.AuthExceptionType;
import com.votogether.domain.auth.service.dto.LoginTokenDto;
import com.votogether.domain.auth.service.dto.ReissuedTokenDto;
import com.votogether.domain.auth.service.dto.TokenPayloadDto;
import com.votogether.domain.auth.service.oauth.KakaoOAuthClient;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.service.MemberService;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.jwt.TokenPayload;
import com.votogether.global.jwt.TokenProcessor;
import com.votogether.global.jwt.exception.JsonException;
import java.time.Duration;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final KakaoOAuthClient kakaoOAuthClient;
    private final MemberService memberService;
    private final TokenProcessor tokenProcessor;
    private final RedisTemplate<String, Long> redisTemplate;

    @Transactional
    public LoginTokenDto register(final String code) {
        final String kakaoAccessToken = kakaoOAuthClient.getAccessToken(code);
        final KakaoMemberResponse response = kakaoOAuthClient.getMemberInfo(kakaoAccessToken);

        final Member member = Member.from(response);
        final Member registeredMember = memberService.register(member);
        final String accessToken = tokenProcessor.generateAccessToken(registeredMember.getId());
        final String refreshToken = tokenProcessor.generateRefreshToken(registeredMember.getId());
        redisTemplate.opsForValue().set(refreshToken, registeredMember.getId(), Duration.ofDays(14L));
        return new LoginTokenDto(accessToken, refreshToken, registeredMember.hasEssentialInfo());
    }

    @Transactional
    public ReissuedTokenDto reissueAuthToken(
            final AccessTokenRequest request,
            final String refreshTokenByRequest
    ) {
        tokenProcessor.validateToken(refreshTokenByRequest);

        final TokenPayloadDto tokenPayloadDto = parseTokens(request.accessToken(), refreshTokenByRequest);
        final TokenPayload accessTokenPayload = tokenPayloadDto.accessTokenPayload();
        final TokenPayload refreshTokenPayload = tokenPayloadDto.refreshTokenPayload();

        redisTemplate.delete(refreshTokenByRequest);
        validateTokenInfo(accessTokenPayload, refreshTokenPayload);

        final String newAccessToken = tokenProcessor.generateAccessToken(accessTokenPayload.memberId());
        final String newRefreshToken = tokenProcessor.generateRefreshToken(refreshTokenPayload.memberId());
        redisTemplate.opsForValue().set(newRefreshToken, accessTokenPayload.memberId(), Duration.ofDays(14L));
        return new ReissuedTokenDto(newAccessToken, newRefreshToken);
    }

    private void validateTokenInfo(final TokenPayload accessTokenPayload, final TokenPayload refreshTokenPayload) {
        if (!Objects.equals(accessTokenPayload.memberId(), refreshTokenPayload.memberId())) {
            throw new BadRequestException(AuthExceptionType.UNMATCHED_INFORMATION_BETWEEN_TOKEN);
        }
    }

    private TokenPayloadDto parseTokens(final String accessToken, final String refreshToken) {
        final TokenPayload accessTokenPayload;
        final TokenPayload refreshTokenPayload;
        try {
            accessTokenPayload = tokenProcessor.parseToken(accessToken);
            refreshTokenPayload = tokenProcessor.parseToken(refreshToken);
        } catch (final JsonProcessingException e) {
            throw new BadRequestException(JsonException.UNEXPECTED_EXCEPTION);
        }
        return new TokenPayloadDto(accessTokenPayload, refreshTokenPayload);
    }

    @Transactional
    public void deleteRefreshToken(final String refreshTokenByRequest) {
        redisTemplate.delete(refreshTokenByRequest);
    }

}
