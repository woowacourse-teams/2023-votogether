package com.votogether.domain.auth.exception;

import com.votogether.global.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum AuthExceptionType implements ExceptionType {

    NONEXISTENT_REFRESH_TOKEN(300, "갱신 토큰이 존재하지 않습니다."),
    UNMATCHED_INFORMATION_BETWEEN_TOKEN(301, "토큰 간의 정보가 일치하지 않습니다.");

    private final int code;
    private final String message;

    AuthExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
