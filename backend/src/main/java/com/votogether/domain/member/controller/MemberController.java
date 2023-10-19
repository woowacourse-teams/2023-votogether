package com.votogether.domain.member.controller;

import com.votogether.domain.member.dto.request.MemberDetailRequest;
import com.votogether.domain.member.dto.request.MemberNicknameUpdateRequest;
import com.votogether.domain.member.dto.response.MemberInfoResponse;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.service.MemberService;
import com.votogether.global.jwt.Auth;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/members")
@RestController
public class MemberController implements MemberControllerDocs {

    private final MemberService memberService;

    @GetMapping("/me")
    public ResponseEntity<MemberInfoResponse> findMemberInfo(@Auth final Member member) {
        return ResponseEntity.ok(memberService.findMemberInfo(member));
    }

    @PatchMapping("/me/nickname")
    public ResponseEntity<Void> changeNickname(
            @Valid @RequestBody final MemberNicknameUpdateRequest request,
            @Auth final Member member
    ) {
        memberService.changeNickname(member, request.nickname());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/me/detail")
    public ResponseEntity<Void> updateDetails(
            @Valid @RequestBody final MemberDetailRequest request,
            @Auth final Member member
    ) {
        memberService.updateDetails(request, member);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/me/check-alarm")
    public ResponseEntity<Void> checkLatestAlarm(@Auth final Member member) {
        memberService.checkLatestAlarm(member);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/me/delete")
    public ResponseEntity<Void> deleteMember(@Auth final Member member) {
        memberService.deleteMember(member);
        return ResponseEntity.noContent().build();
    }

}
