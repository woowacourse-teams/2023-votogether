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

    @Transactional(noRollbackFor = {BadRequestException.class})
    public TokenResponse reissueAuthToken(
            final AccessTokenRequest request,
            final String refreshTokenByRequest
    ) throws JsonProcessingException {
        tokenProcessor.validateToken(refreshTokenByRequest);

        final RefreshToken refreshToken = refreshTokenRepository.findById(refreshTokenByRequest)
                .orElseThrow(() -> new BadRequestException(TokenExceptionType.INVALID_REFRESH_TOKEN));
        final TokenPayload accessTokenPayload = tokenProcessor.parseToken(request.accessToken());
        validateTokenInfo(accessTokenPayload, refreshToken);

        final String accessToken = tokenProcessor.generateAccessToken(refreshToken.getMemberId());
        final String newRefreshToken = tokenProcessor.generateRefreshToken(refreshToken.getMemberId());
        refreshTokenRepository.save(new RefreshToken(newRefreshToken, refreshToken.getMemberId()));
        return new TokenResponse(accessToken, newRefreshToken);
    }

    private void validateTokenInfo(final TokenPayload accessTokenPayload, final RefreshToken refreshToken) {
        refreshTokenRepository.delete(refreshToken);
        if (!accessTokenPayload.memberId().equals(refreshToken.getMemberId())) {
            throw new BadRequestException(TokenExceptionType.UNMATCHED_INFORMATION);
        }
    }

    @Transactional
    public void deleteRefreshToken(final String refreshTokenByRequest) {
        final RefreshToken refreshToken = refreshTokenRepository.findById(refreshTokenByRequest)
                .orElseThrow(() -> new BadRequestException(TokenExceptionType.INVALID_REFRESH_TOKEN));
        refreshTokenRepository.delete(refreshToken);
    }

}
