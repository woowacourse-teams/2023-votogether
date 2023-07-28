package com.votogether.domain.post.exception;

import com.votogether.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum CommentExceptionType implements ExceptionType {

    INVALID_CONTENT_LENGTH(2000, "유효하지 않은 댓글 길이입니다.");

    private final int code;
    private final String message;

    CommentExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
