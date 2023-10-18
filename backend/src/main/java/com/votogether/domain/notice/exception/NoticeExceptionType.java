package com.votogether.domain.notice.exception;

import com.votogether.global.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum NoticeExceptionType implements ExceptionType {

    EMPTY_TITLE(1100, "공지사항 제목이 존재하지 않거나 공백입니다."),
    EMPTY_CONTENT(1101, "공지사항 내용이 존재하지 않거나 공백입니다."),
    INVALID_TITLE_LENGTH(1102, "공지사항 제목의 길이가 유효하지 않습니다."),
    INVALID_CONTENT_LENGTH(1103, "공지사항 내용의 길이가 유효하지 않습니다."),
    INVALID_BANNER_TITLE_LENGTH(1104, "공지사항 배너 제목의 길이가 유효하지 않습니다."),
    NOT_FOUND(1105, "공지사항이 존재하지 않습니다."),
    EMPTY_BANNER_TITLE(1106, "공지사항 배너 제목이 공백으로 이루어져 있습니다."),
    ;

    private final int code;
    private final String message;

    NoticeExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
