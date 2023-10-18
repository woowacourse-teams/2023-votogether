package com.votogether.domain.report.exception;

import com.votogether.global.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum ReportExceptionType implements ExceptionType {

    REPORT_MY_POST(1200, "자신의 게시글은 신고할 수 없습니다."),
    ALREADY_HIDDEN_POST(1201, "이미 블라인드 처리된 글입니다."),
    DUPLICATE_POST_REPORT(1202, "하나의 글에 대해서 중복하여 신고할 수 없습니다."),
    REPORT_MY_COMMENT(1203, "자신의 댓글은 신고할 수 없습니다."),
    ALREADY_HIDDEN_COMMENT(1204, "이미 블라인드 처리된 댓글입니다."),
    DUPLICATE_COMMENT_REPORT(1205, "하나의 댓글에 대해서 중복하여 신고할 수 없습니다."),
    REPORT_MY_NICKNAME(1206, "자신의 닉네임은 신고할 수 없습니다."),
    DUPLICATE_NICKNAME_REPORT(1207, "하나의 닉네임에 대해서 중복하여 신고할 수 없습니다."),
    NOT_FOUND(1208, "신고가 존재하지 않습니다."),
    NOT_FOUND_REPORT_AGGREGATE(1209, "신고 집계가 존재하지 않습니다.");

    private final int code;
    private final String message;

    ReportExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
