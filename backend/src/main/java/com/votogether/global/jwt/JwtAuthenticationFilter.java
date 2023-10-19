package com.votogether.global.jwt;

import com.votogether.global.log.context.MemberIdHolder;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.filter.OncePerRequestFilter;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final List<String> ALLOWED_URIS = List.of(
            "/health-check",
            "/categories/guest",
            "/swagger-ui.html",
            "/favicon.ico"
    );

    private static final List<String> ALLOWED_START_URIS = List.of(
            "/auth",
            "/v3/api-docs",
            "/swagger-ui",
            "/h2-console"
    );

    private static final List<String> ALLOWED_END_URIS = List.of(
            "/guest"
    );

    private static final Map<String, String> MATCH_URI_METHOD = new HashMap<>(
            Map.ofEntries(
                    Map.entry("^/posts/.+/comments$", "GET"),
                    Map.entry("^/notices.*$", "GET")
            )
    );

    private final MemberIdHolder memberIdHolder;
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
        final TokenPayload tokenPayload = tokenProcessor.parseToken(tokenWithoutType);
        memberIdHolder.setId(tokenPayload.memberId());
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(final HttpServletRequest request) {
        return containsAllowedUris(request) || startsWithAllowedStartUris(request)
                || matchesGuestRequest(request) || matchesUriPattern(request);
    }

    private boolean containsAllowedUris(final HttpServletRequest request) {
        return ALLOWED_URIS.stream()
                .anyMatch(url -> request.getRequestURI().contains(url));
    }

    private boolean startsWithAllowedStartUris(final HttpServletRequest request) {
        return ALLOWED_START_URIS.stream()
                .anyMatch(url -> request.getRequestURI().startsWith(url));
    }

    private boolean matchesGuestRequest(final HttpServletRequest request) {
        return ALLOWED_END_URIS.stream()
                .anyMatch(url -> request.getRequestURI().endsWith(url) &&
                        Objects.equals(request.getMethod(), HttpMethod.GET.name()));
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
