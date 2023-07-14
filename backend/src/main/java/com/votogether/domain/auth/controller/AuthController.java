package com.votogether.domain.auth.controller;

import com.votogether.domain.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final AuthService authService;

    @PostMapping("/auth/kakao/callback")
    public ResponseEntity<Void> loginByKakao(@RequestParam("code") final String code) {
        authService.register(code);
        return ResponseEntity.ok().build();
    }

}
