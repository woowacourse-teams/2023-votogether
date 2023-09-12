package com.votogether.domain.post.exception;

import com.votogether.global.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum CommentExceptionType implements ExceptionType {

    INVALID_CONTENT_LENGTH(2000, "유효하지 않은 댓글 길이입니다."),
    COMMENT_NOT_FOUND(2001, "해당 댓글이 존재하지 않습니다."),
    NOT_BELONG_POST(2002, "댓글의 게시글 정보와 일치하지 않습니다."),
    NOT_WRITER(2003, "댓글 작성자가 아닙니다.");

    private final int code;
    private final String message;

    CommentExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
