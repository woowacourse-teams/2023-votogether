package com.votogether.global.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@RequiredArgsConstructor
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final List<String> ALLOWED_URIS = List.of(
            "/health-check",
            "/auth/kakao/callback",
            "/categories/guest",
            "/swagger-ui.html"
    );

    private static final List<String> ALLOWED_START_URIS = List.of(
            "/v3/api-docs",
            "/swagger-ui",
            "/h2-console"
    );

    private static final Map<String, String> MATCH_URI_METHOD = new HashMap<>(
            Map.ofEntries(
                    Map.entry("^/posts/.+/comments$", "GET")
            )
    );

    private final TokenProcessor tokenProcessor;

    @Override
    protected void doFilterInternal(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final FilterChain filterChain
    ) throws ServletException, IOException {
        final String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String tokenWithoutType = tokenProcessor.resolveToken(token);
        tokenProcessor.validateToken(tokenWithoutType);
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(final HttpServletRequest request) {
        return containsAllowedUris(request) || startsWithAllowedStartUris(request) || matchesUriPattern(request);
    }

    private boolean containsAllowedUris(final HttpServletRequest request) {
        return ALLOWED_URIS.stream()
                .anyMatch(url -> request.getRequestURI().contains(url));
    }

    private boolean startsWithAllowedStartUris(final HttpServletRequest request) {
        return ALLOWED_START_URIS.stream()
                .anyMatch(url -> request.getRequestURI().startsWith(url));
    }

    private boolean matchesUriPattern(final HttpServletRequest request) {
        return MATCH_URI_METHOD.keySet()
                .stream()
                .anyMatch(key -> isMatchUriAndMethod(request, key));
    }

    private boolean isMatchUriAndMethod(final HttpServletRequest request, final String uriPattern) {
        return request.getRequestURI().matches(uriPattern)
                && MATCH_URI_METHOD.get(uriPattern).equalsIgnoreCase(request.getMethod());
    }

}
