package com.votogether.domain.member.controller;

import com.votogether.domain.member.dto.MemberInfoResponse;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.service.MemberService;
import com.votogether.global.jwt.Auth;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/members")
@RestController
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/me")
    public ResponseEntity<MemberInfoResponse> findMemberInfo(@Auth final Member member) {
        return ResponseEntity.ok(memberService.findMemberInfo(member));
    }

}
