package com.votogether.domain.member.controller;

import com.votogether.domain.member.dto.MemberNicknameRequest;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.service.MemberService;
import com.votogether.global.jwt.Auth;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;

    @PatchMapping("/members/me/nickname")
    public ResponseEntity<Void> changeNickname(
            @Auth final Member member,
            @RequestBody final MemberNicknameRequest request
    ) {
        memberService.changeNickname(member, request.nickname());
        return ResponseEntity.ok().build();
    }
}
