package com.votogether.domain.auth.controller;

import com.votogether.domain.auth.dto.request.AccessTokenRequest;
import com.votogether.domain.auth.dto.response.LoginResponse;
import com.votogether.domain.auth.dto.response.ReissuedAccessTokenResponse;
import com.votogether.global.exception.ExceptionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "인증", description = "인증 API")
public interface AuthControllerDocs {

    @Operation(summary = "카카오 로그인 하기", description = "카카오 계정으로 로그인 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "카카오 로그인 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "올바르지 않은 요청",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "올바르지 않은 인증코드",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<LoginResponse> loginByKakao(
            @Parameter(description = "카카오 인가코드", example = "abcdegf") final String code,
            final HttpServletResponse httpServletResponse
    );

    @Operation(summary = "액세스 토큰 재발급 하기", description = "액세스 토큰을 재발급 받는다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "액세스 토큰 재발급 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "올바르지 않은 갱신 토큰",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "요청으로부터 찾을 수 없는 갱신 토큰",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<ReissuedAccessTokenResponse> reissueAccessToken(
            @RequestBody final AccessTokenRequest request,
            final HttpServletRequest httpServletRequest,
            final HttpServletResponse httpServletResponse
    );

}
