package com.votogether.global;

import com.votogether.global.jwt.TokenProcessor;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final List<String> ALLOWED_URIS = List.of(
            "/health-check",
            "/auth/kakao/callback",
            "/categories/guest"
    );

    private final TokenProcessor tokenProcessor;

    @Override
    protected void doFilterInternal(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final FilterChain filterChain
    ) throws ServletException, IOException {
        final String token = tokenProcessor.resolveToken(request);
        tokenProcessor.validateToken(token);
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(final HttpServletRequest request) throws ServletException {
        return ALLOWED_URIS.stream()
                .anyMatch(url -> request.getRequestURI().contains(url));
    }

}
