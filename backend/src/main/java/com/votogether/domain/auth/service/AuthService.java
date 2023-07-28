package com.votogether.domain.auth.service;

import com.votogether.domain.auth.dto.KakaoMemberResponse;
import com.votogether.domain.auth.dto.LoginResponse;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.service.MemberService;
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

    @Transactional
    public LoginResponse register(final String code) {
        final String accessToken = kakaoOAuthClient.getAccessToken(code);
        final KakaoMemberResponse response = kakaoOAuthClient.getMemberInfo(accessToken);

        final Member member = Member.from(response);
        final Member registeredMember = memberService.register(member);
        final String token = tokenProcessor.generateToken(registeredMember);
        return new LoginResponse(token, registeredMember.getNickname().getValue());
    }

}
