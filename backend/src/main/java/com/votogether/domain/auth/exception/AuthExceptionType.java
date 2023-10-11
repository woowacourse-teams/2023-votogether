package com.votogether.domain.auth.exception;

import com.votogether.global.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum AuthExceptionType implements ExceptionType {

    NONEXISTENT_REFRESH_TOKEN(300, "갱신 토큰이 존재하지 않습니다."),
    UNMATCHED_INFORMATION_BETWEEN_TOKEN(301, "토큰 간의 정보가 일치하지 않습니다."),
    INVALID_TOKEN(302, "올바르지 않은 토큰입니다."),
    UNSUPPORTED_TOKEN(303, "지원하지 않는 JWT입니다."),
    MALFORMED_TOKEN(304, "잘못된 JWT 서명입니다."),
    SIGNATURE_TOKEN(305, "토큰의 서명 유효성 검사가 실패했습니다."),
    EXPIRED_TOKEN(306, "토큰의 유효기간이 만료되었습니다."),
    UNKNOWN_TOKEN(307, "알 수 없는 토큰 유효성 문제가 발생했습니다.");

    private final int code;
    private final String message;

    AuthExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
