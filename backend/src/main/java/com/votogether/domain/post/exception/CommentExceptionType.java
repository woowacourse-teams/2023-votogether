package com.votogether.domain.post.exception;

import com.votogether.global.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum CommentExceptionType implements ExceptionType {

    INVALID_LENGTH(600, "유효하지 않은 댓글 길이입니다."),
    NOT_FOUND(601, "댓글이 존재하지 않습니다."),
    NOT_BELONG_POST(602, "게시글의 댓글이 아닙니다."),
    NOT_WRITER(603, "댓글 작성자가 아닙니다."),
    IS_HIDDEN(604, "신고에 의해 숨겨진 댓글은 접근할 수 없습니다."),
    REPORT_MINE(605, "본인 댓글은 신고할 수 없습니다."),
    ;

    private final int code;
    private final String message;

    CommentExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
