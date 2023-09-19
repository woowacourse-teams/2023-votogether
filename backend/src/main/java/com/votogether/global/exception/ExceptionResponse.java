package com.votogether.global.exception;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "예외 발생 응답")
public record ExceptionResponse(
        @Schema(description = "예외 코드", example = "-9999")
        int code,

        @Schema(description = "예외 메시지", example = "알 수 없는 서버 예외가 발생하였습니다.")
        String message
) {

    public static ExceptionResponse from(final BaseException e) {
        final ExceptionType exceptionType = e.getExceptionType();
        return new ExceptionResponse(exceptionType.getCode(), exceptionType.getMessage());
    }

}
