package com.votogether.domain.alarm.exception;

import com.votogether.global.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum AlarmExceptionType implements ExceptionType {

    NOT_FOUND_ACTION(1300, "신고 조치 알림이 존재하지 않습니다."),
    NOT_FOUND(1301, "알림이 존재하지 않습니다."),
    NOT_OWNER(1302, "알림을 읽을 대상이 아닙니다."),
    NOT_FOUND_ACTION_TYPE(1303, "등록되지 않은 알림 동작입니다."),
    ;

    private final int code;
    private final String message;

    AlarmExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
