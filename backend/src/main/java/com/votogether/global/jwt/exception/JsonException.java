package com.votogether.global.jwt.exception;

import com.votogether.global.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum JsonException implements ExceptionType {

    UNEXPECTED_EXCEPTION(2000, "예상치 못한 Json관련 문제가 발생했습니다."),
    ;

    private final int code;
    private final String message;

    JsonException(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
