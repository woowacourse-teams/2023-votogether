package com.votogether.domain.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.votogether.domain.auth.RefreshToken;
import com.votogether.domain.auth.dto.request.AccessTokenRequest;
import com.votogether.domain.auth.dto.response.KakaoMemberResponse;
import com.votogether.domain.auth.exception.TokenExceptionType;
import com.votogether.domain.auth.repository.RefreshTokenRepository;
import com.votogether.domain.auth.service.dto.LoginTokenResponse;
import com.votogether.domain.auth.service.dto.TokenResponse;
import com.votogether.domain.auth.service.oauth.KakaoOAuthClient;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.service.MemberService;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import com.votogether.global.jwt.TokenPayload;
import com.votogether.global.jwt.TokenProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final KakaoOAuthClient kakaoOAuthClient;
    private final MemberService memberService;
    private final TokenProcessor tokenProcessor;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public LoginTokenResponse register(final String code) {
        final String kakaoAccessToken = kakaoOAuthClient.getAccessToken(code);
        final KakaoMemberResponse response = kakaoOAuthClient.getMemberInfo(kakaoAccessToken);

        final Member member = Member.from(response);
        final Member registeredMember = memberService.register(member);
        final String accessToken = tokenProcessor.generateAccessToken(registeredMember.getId());
        final String refreshToken = tokenProcessor.generateRefreshToken(registeredMember.getId());
        refreshTokenRepository.save(new RefreshToken(refreshToken, registeredMember.getId()));
        return new LoginTokenResponse(accessToken, refreshToken, registeredMember.hasEssentialInfo());
    }

    @Transactional
    public TokenResponse reissueAuthToken(
            final AccessTokenRequest request,
            final String refreshTokenByRequest
    ) throws JsonProcessingException {
        tokenProcessor.validateToken(refreshTokenByRequest);

        final TokenPayload accessTokenPayload = tokenProcessor.parseToken(request.accessToken());
        final RefreshToken refreshToken = refreshTokenRepository.findById(refreshTokenByRequest)
                .orElseThrow(() -> new NotFoundException(TokenExceptionType.NONEXISTENT_REFRESH_TOKEN));
        validateTokenInfo(accessTokenPayload, refreshToken);

        final String newAccessToken = tokenProcessor.generateAccessToken(refreshToken.getMemberId());
        final String newRefreshToken = tokenProcessor.generateRefreshToken(refreshToken.getMemberId());
        refreshTokenRepository.save(new RefreshToken(newRefreshToken, refreshToken.getMemberId()));
        return new TokenResponse(newAccessToken, newRefreshToken);
    }

    private void validateTokenInfo(final TokenPayload accessTokenPayload, final RefreshToken refreshToken) {
        refreshTokenRepository.delete(refreshToken);
        if (!accessTokenPayload.memberId().equals(refreshToken.getMemberId())) {
            throw new BadRequestException(TokenExceptionType.UNMATCHED_INFORMATION_BETWEEN_TOKEN);
        }
    }

    @Transactional
    public void deleteRefreshToken(final String refreshTokenByRequest) {
        final RefreshToken refreshToken = refreshTokenRepository.findById(refreshTokenByRequest)
                .orElseThrow(() -> new NotFoundException(TokenExceptionType.NONEXISTENT_REFRESH_TOKEN));
        refreshTokenRepository.delete(refreshToken);
    }

}
