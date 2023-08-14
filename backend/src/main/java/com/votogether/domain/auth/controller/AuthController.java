package com.votogether.domain.auth.controller;

import com.votogether.domain.auth.dto.response.LoginResponse;
import com.votogether.domain.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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

}
