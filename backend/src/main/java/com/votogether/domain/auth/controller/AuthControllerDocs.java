package com.votogether.domain.auth.controller;

import com.votogether.domain.auth.dto.response.LoginResponse;
import com.votogether.global.exception.ExceptionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

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

}
