package com.votogether.domain.auth.exception;

import com.votogether.global.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum TokenExceptionType implements ExceptionType {

    NONEXISTENT_REFRESH_TOKEN(2000, "RefreshToken이 존재하지 않습니다."),
    INVALID_REFRESH_TOKEN(2001, "유효하지 않은 RefreshToken입니다."),
    UNMATCHED_INFORMATION(2002, "토큰 간의 정보가 일치하지 않습니다.");

    private final int code;
    private final String message;

    TokenExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
