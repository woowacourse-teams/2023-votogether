package com.votogether.global.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@RequiredArgsConstructor
@Component
public class JwtAuthorizationArgumentResolver implements HandlerMethodArgumentResolver {

    private final TokenProcessor tokenProcessor;
    private final MemberService memberService;

    @Override
    public boolean supportsParameter(final MethodParameter parameter) {
        return parameter.withContainingClass(Member.class)
                .hasParameterAnnotation(Auth.class);
    }

    @Override
    public Member resolveArgument(
            final MethodParameter parameter,
            final ModelAndViewContainer mavContainer,
            final NativeWebRequest webRequest,
            final WebDataBinderFactory binderFactory
    ) throws JsonProcessingException {
        final String token = webRequest.getHeader(HttpHeaders.AUTHORIZATION);
        final String tokenWithoutType = tokenProcessor.resolveToken(token);
        tokenProcessor.validateToken(tokenWithoutType);
        final TokenPayload tokenPayload = tokenProcessor.parseToken(tokenWithoutType);
        return memberService.findById(tokenPayload.memberId());
    }

}
