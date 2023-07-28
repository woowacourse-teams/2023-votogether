package com.votogether.domain.member.controller;

import com.votogether.domain.member.dto.MemberInfoResponse;
import com.votogether.domain.member.dto.MemberNicknameUpdateRequest;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.service.MemberService;
import com.votogether.global.jwt.Auth;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "회원", description = "회원 API")
@RequiredArgsConstructor
@RequestMapping("/members")
@RestController
public class MemberController {

    private final MemberService memberService;

    @Operation(summary = "회원 정보 조회", description = "회원 정보를 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "정보 조회 성공"),
            @ApiResponse(responseCode = "400", description = "올바르지 않은 요청")
    })
    @GetMapping("/me")
    public ResponseEntity<MemberInfoResponse> findMemberInfo(@Auth final Member member) {
        return ResponseEntity.ok(memberService.findMemberInfo(member));
    }

    @Operation(summary = "회원 닉네임 변경", description = "회원 닉네임을 변경한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "닉네임 변경 성공"),
            @ApiResponse(responseCode = "400", description = "올바르지 않은 변경할 닉네임 요청")
    })
    @PatchMapping("/me/nickname")
    public ResponseEntity<Void> changeNickname(
            @Auth final Member member,
            @Valid @RequestBody final MemberNicknameUpdateRequest request
    ) {
        memberService.changeNickname(member, request.nickname());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "회원 탈퇴", description = "서비스를 탈퇴한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "회원 탈퇴 성공"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 회원")
    })
    @DeleteMapping("/me/delete")
    public ResponseEntity<Void> deleteMember(@Auth final Member member) {
        memberService.deleteMember(member);
        return ResponseEntity.noContent().build();
    }

}
