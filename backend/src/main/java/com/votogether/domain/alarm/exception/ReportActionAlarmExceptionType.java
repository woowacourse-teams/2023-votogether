package com.votogether.domain.alarm.exception;

import com.votogether.global.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum ReportActionAlarmExceptionType implements ExceptionType {

    NOT_FOUND(1300, "신고조치알림이 존재하지 않습니다."),
    ;

    private final int code;
    private final String message;

    ReportActionAlarmExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }
}
