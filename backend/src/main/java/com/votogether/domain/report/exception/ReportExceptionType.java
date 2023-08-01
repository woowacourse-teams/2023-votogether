package com.votogether.domain.report.exception;

import com.votogether.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum ReportExceptionType implements ExceptionType {

    REPORT_MY_POST(1200, "자신의 게시글은 신고할 수 없습니다."),
    ALREADY_HIDDEN_POST(1201, "이미 블라인드 처리된 글입니다."),
    DUPLICATE_POST_REPORT(1202, "하나의 글에 대해서 중복하여 신고할 수 없습니다."),
    ;

    private final int code;
    private final String message;

    ReportExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
