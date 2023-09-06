package com.votogether.domain.auth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.votogether.domain.auth.dto.request.AccessTokenRequest;
import com.votogether.domain.auth.dto.response.AccessTokenResponse;
import com.votogether.domain.auth.dto.response.LoginResponse;
import com.votogether.domain.auth.exception.TokenExceptionType;
import com.votogether.domain.auth.service.AuthService;
import com.votogether.domain.auth.service.dto.TokenResponse;
import com.votogether.global.exception.BadRequestException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AuthController implements AuthControllerDocs {

    private final AuthService authService;

    @GetMapping("/auth/kakao/callback")
    public ResponseEntity<LoginResponse> loginByKakao(@RequestParam final String code) {
        return ResponseEntity.ok(authService.register(code));
    }

    @PostMapping("/auth/silent-login")
    public ResponseEntity<AccessTokenResponse> reissueAccessToken(
            @RequestBody final AccessTokenRequest request,
            final HttpServletRequest httpServletRequest,
            final HttpServletResponse httpServletResponse
    ) throws JsonProcessingException {
        final String refreshToken = Arrays.stream(httpServletRequest.getCookies())
                .map(cookie -> cookie.getAttribute("refreshToken"))
                .findAny()
                .orElseThrow(() -> new BadRequestException(TokenExceptionType.NONEXISTENT_REFRESH_TOKEN));
        final TokenResponse tokenResponse = authService.reissueAuthToken(request, refreshToken);

        final Cookie cookie = new Cookie("refreshToken", tokenResponse.refreshToken());
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        httpServletResponse.addCookie(cookie);

        final AccessTokenResponse response = new AccessTokenResponse(tokenResponse.accessToken());
        return ResponseEntity.ok(response);
    }

}
