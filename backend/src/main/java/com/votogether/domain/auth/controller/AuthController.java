package com.votogether.domain.auth.controller;

import com.votogether.domain.auth.dto.request.AccessTokenRequest;
import com.votogether.domain.auth.dto.response.LoginResponse;
import com.votogether.domain.auth.dto.response.ReissuedAccessTokenResponse;
import com.votogether.domain.auth.exception.AuthExceptionType;
import com.votogether.domain.auth.service.AuthService;
import com.votogether.domain.auth.service.dto.LoginTokenDto;
import com.votogether.domain.auth.service.dto.ReissuedTokenDto;
import com.votogether.global.exception.BadRequestException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.server.Cookie.SameSite;
import org.springframework.http.ResponseCookie;
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
        final LoginTokenDto loginTokenDto = authService.register(code);

        addRefreshTokenToCookie(httpServletResponse, loginTokenDto.refreshToken());
        final LoginResponse response =
                new LoginResponse(loginTokenDto.accessToken(), loginTokenDto.hasEssentialInfo());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/silent-login")
    public ResponseEntity<ReissuedAccessTokenResponse> reissueAccessToken(
            @RequestBody @Valid final AccessTokenRequest request,
            final HttpServletRequest httpServletRequest,
            final HttpServletResponse httpServletResponse
    ) {
        final String refreshToken = getRefreshTokenFromCookie(httpServletRequest);
        final ReissuedTokenDto reissuedTokenDto = authService.reissueAuthToken(request, refreshToken);

        addRefreshTokenToCookie(httpServletResponse, reissuedTokenDto.refreshToken());
        final ReissuedAccessTokenResponse response = new ReissuedAccessTokenResponse(reissuedTokenDto.accessToken());
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
        final ResponseCookie responseCookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(1209600)
                .sameSite(SameSite.NONE.attributeValue())
                .build();
        httpServletResponse.setHeader("Set-Cookie", responseCookie.toString());
    }

    private String getRefreshTokenFromCookie(final HttpServletRequest httpServletRequest) {
        return Arrays.stream(httpServletRequest.getCookies())
                .filter(cookie -> cookie.getName().equals("refreshToken"))
                .findAny()
                .map(Cookie::getValue)
                .orElseThrow(() -> new BadRequestException(AuthExceptionType.NONEXISTENT_REFRESH_TOKEN));
    }

    private void expireCookie(final HttpServletResponse httpServletResponse, final String refreshToken) {
        final ResponseCookie responseCookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite(SameSite.NONE.attributeValue())
                .build();
        httpServletResponse.setHeader("Set-Cookie", responseCookie.toString());
    }

}

