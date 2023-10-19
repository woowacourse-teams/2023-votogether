package com.votogether.domain.member.controller;

import com.votogether.domain.member.dto.request.MemberDetailRequest;
import com.votogether.domain.member.dto.request.MemberNicknameUpdateRequest;
import com.votogether.domain.member.dto.response.MemberInfoResponse;
import com.votogether.domain.member.entity.Member;
import com.votogether.global.exception.ExceptionResponse;
import com.votogether.global.jwt.Auth;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "회원", description = "회원 API")
public interface MemberControllerDocs {

    @Operation(summary = "회원 정보 조회", description = "회원 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "회원 정보 조회 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "회원에 해당하는 통계 정보가 없는 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<MemberInfoResponse> findMemberInfo(final Member member);

    @Operation(summary = "회원 닉네임 변경", description = "회원 닉네임을 변경한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "회원 닉네임 변경 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 닉네임 형식",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> changeNickname(
            final MemberNicknameUpdateRequest request,
            final Member member
    );

    @Operation(summary = "회원 상세 정보 변경", description = "회원의 상세 정보를 변경한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "회원 상세 정보 변경 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 상세 정보",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> updateDetails(
            final MemberDetailRequest request,
            final Member member
    );

    @Operation(summary = "회원 최신 알림 확인", description = "회원의 최신 알림 읽은 시간을 수정한다.")
    @ApiResponse(responseCode = "200", description = "최신 알림 읽기 성공")
    ResponseEntity<Void> checkLatestAlarm(@Auth final Member member);

    @Operation(summary = "회원 탈퇴", description = "회원 탈퇴한다.")
    @ApiResponse(responseCode = "200", description = "회원 탈퇴 성공")
    ResponseEntity<Void> deleteMember(final Member member);

}
