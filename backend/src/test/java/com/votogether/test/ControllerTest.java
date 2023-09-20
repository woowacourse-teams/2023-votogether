package com.votogether.test;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

import com.votogether.domain.member.service.MemberService;
import com.votogether.global.jwt.TokenPayload;
import com.votogether.global.jwt.TokenProcessor;
import com.votogether.test.fixtures.MemberFixtures;
import org.springframework.boot.test.mock.mockito.MockBean;

public class ControllerTest {

    protected static final String BEARER_TOKEN = "Bearer token";

    @MockBean
    TokenProcessor tokenProcessor;

    @MockBean
    MemberService memberService;

    protected void mockingAuthArgumentResolver() throws Exception {
        TokenPayload tokenPayload = new TokenPayload(1L, 1L, 1L);
        given(tokenProcessor.resolveToken(anyString())).willReturn("token");
        given(tokenProcessor.parseToken(anyString())).willReturn(tokenPayload);
        given(memberService.findById(anyLong())).willReturn(MemberFixtures.MALE_20.get());
    }

}
