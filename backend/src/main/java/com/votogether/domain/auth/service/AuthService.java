package com.votogether.domain.auth.service;

import com.votogether.domain.auth.dto.KakaoMemberResponse;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.service.MemberService;
import com.votogether.global.jwt.TokenProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final KakaoOAuthClient kakaoOAuthClient;
    private final MemberService memberService;
    private final TokenProcessor tokenProcessor;

    public String register(final String code) {
        final String accessToken = kakaoOAuthClient.getAccessToken(code);
        final KakaoMemberResponse response = kakaoOAuthClient.getMemberInfo(accessToken);

        final Member member = Member.createKakaoMember(response);
        final Member registeredMember = memberService.register(member);

        return tokenProcessor.generateToken(registeredMember);
    }

}
