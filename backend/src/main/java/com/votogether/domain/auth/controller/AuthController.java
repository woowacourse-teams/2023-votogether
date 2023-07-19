package com.votogether.domain.auth.controller;

import com.votogether.domain.auth.dto.LoginResponse;
import com.votogether.domain.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "회원가입", description = "회원가입 및 로그인 API")
@RequiredArgsConstructor
@RestController
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "카카오 로그인 하기", description = "카카오 계정으로 로그인을 한다.")
    @ApiResponse(responseCode = "200", description = "로그인 성공")
    @GetMapping("/auth/kakao/callback")
    public ResponseEntity<LoginResponse> loginByKakao(@RequestParam("code") final String code) {
        final String token = authService.register(code);
        return ResponseEntity.ok(new LoginResponse(token));
    }

}
