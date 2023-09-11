package com.votogether.domain.auth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.votogether.domain.auth.dto.request.AccessTokenRequest;
import com.votogether.domain.auth.dto.response.LoginResponse;
import com.votogether.domain.auth.dto.response.ReissuedAccessTokenResponse;
import com.votogether.domain.auth.exception.AuthExceptionType;
import com.votogether.domain.auth.service.AuthService;
import com.votogether.domain.auth.service.dto.LoginTokenResponse;
import com.votogether.domain.auth.service.dto.TokenResponse;
import com.votogether.global.exception.BadRequestException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/auth")
@RestController
public class AuthController implements AuthControllerDocs {

    private final AuthService authService;

    @GetMapping("/kakao/callback")
    public ResponseEntity<LoginResponse> loginByKakao(
            @RequestParam final String code,
            final HttpServletResponse httpServletResponse
    ) {
        final LoginTokenResponse loginTokenResponse = authService.register(code);

        addRefreshTokenToCookie(httpServletResponse, loginTokenResponse.refreshToken());
        final LoginResponse response =
                new LoginResponse(loginTokenResponse.accessToken(), loginTokenResponse.hasEssentialInfo());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/silent-login")
    public ResponseEntity<ReissuedAccessTokenResponse> reissueAccessToken(
            @RequestBody @Valid final AccessTokenRequest request,
            final HttpServletRequest httpServletRequest,
            final HttpServletResponse httpServletResponse
    ) throws JsonProcessingException {
        final String refreshToken = getRefreshTokenFromCookie(httpServletRequest);
        final TokenResponse tokenResponse = authService.reissueAuthToken(request, refreshToken);

        addRefreshTokenToCookie(httpServletResponse, tokenResponse.refreshToken());
        final ReissuedAccessTokenResponse response = new ReissuedAccessTokenResponse(tokenResponse.accessToken());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<Void> logout(
            final HttpServletRequest httpServletRequest,
            final HttpServletResponse httpServletResponse
    ) {
        final String refreshToken = getRefreshTokenFromCookie(httpServletRequest);
        authService.deleteRefreshToken(refreshToken);

        expireCookie(httpServletResponse, refreshToken);
        return ResponseEntity.noContent().build();
    }

    private void addRefreshTokenToCookie(final HttpServletResponse httpServletResponse, final String refreshToken) {
        final Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/auth");
        httpServletResponse.addCookie(cookie);
    }

    private String getRefreshTokenFromCookie(final HttpServletRequest httpServletRequest) {
        return Arrays.stream(httpServletRequest.getCookies())
                .filter(cookie -> cookie.getName().equals("refreshToken"))
                .findAny()
                .map(Cookie::getValue)
                .orElseThrow(() -> new BadRequestException(AuthExceptionType.NONEXISTENT_REFRESH_TOKEN));
    }

    private void expireCookie(final HttpServletResponse httpServletResponse, final String refreshToken) {
        final Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setMaxAge(0);
        httpServletResponse.addCookie(cookie);
    }

}

