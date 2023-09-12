package com.votogether.domain.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.votogether.domain.auth.dto.request.AccessTokenRequest;
import com.votogether.domain.auth.dto.response.KakaoMemberResponse;
import com.votogether.domain.auth.exception.AuthExceptionType;
import com.votogether.domain.auth.service.dto.LoginTokenResponse;
import com.votogether.domain.auth.service.dto.TokenResponse;
import com.votogether.domain.auth.service.oauth.KakaoOAuthClient;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.service.MemberService;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.jwt.TokenPayload;
import com.votogether.global.jwt.TokenProcessor;
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
    public LoginTokenResponse register(final String code) {
        final String kakaoAccessToken = kakaoOAuthClient.getAccessToken(code);
        final KakaoMemberResponse response = kakaoOAuthClient.getMemberInfo(kakaoAccessToken);

        final Member member = Member.from(response);
        final Member registeredMember = memberService.register(member);
        final String accessToken = tokenProcessor.generateAccessToken(registeredMember.getId());
        final String refreshToken = tokenProcessor.generateRefreshToken(registeredMember.getId());
        redisTemplate.opsForValue().set(refreshToken, registeredMember.getId());
        return new LoginTokenResponse(accessToken, refreshToken, registeredMember.hasEssentialInfo());
    }

    @Transactional
    public TokenResponse reissueAuthToken(
            final AccessTokenRequest request,
            final String refreshTokenByRequest
    ) throws JsonProcessingException {
        tokenProcessor.validateToken(refreshTokenByRequest);

        final TokenPayload accessTokenPayload = tokenProcessor.parseToken(request.accessToken());
        final TokenPayload refreshTokenPayload = tokenProcessor.parseToken(refreshTokenByRequest);

        redisTemplate.delete(refreshTokenByRequest);
        validateTokenInfo(accessTokenPayload, refreshTokenPayload);

        final String newAccessToken = tokenProcessor.generateAccessToken(accessTokenPayload.memberId());
        final String newRefreshToken = tokenProcessor.generateRefreshToken(accessTokenPayload.memberId());
        redisTemplate.opsForValue().set(newRefreshToken, accessTokenPayload.memberId());
        return new TokenResponse(newAccessToken, newRefreshToken);
    }

    private void validateTokenInfo(final TokenPayload accessTokenPayload, final TokenPayload refreshTokenPayload) {
        if (!Objects.equals(accessTokenPayload.memberId(), refreshTokenPayload.memberId())) {
            throw new BadRequestException(AuthExceptionType.UNMATCHED_INFORMATION_BETWEEN_TOKEN);
        }
    }

    @Transactional
    public void deleteRefreshToken(final String refreshTokenByRequest) {
        redisTemplate.delete(refreshTokenByRequest);
    }

}
