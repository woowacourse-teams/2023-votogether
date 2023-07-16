package com.votogether.domain.auth.controller;

import com.votogether.domain.auth.dto.LoginResponse;
import com.votogether.domain.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final AuthService authService;

    @GetMapping("/auth/kakao/callback")
    public ResponseEntity<LoginResponse> loginByKakao(@RequestParam("code") final String code) {
        final String token = authService.register(code);
        return ResponseEntity.ok(new LoginResponse(token));
    }

}
