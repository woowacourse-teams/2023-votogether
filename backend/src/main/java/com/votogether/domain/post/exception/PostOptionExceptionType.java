package com.votogether.domain.post.exception;

import com.votogether.global.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum PostOptionExceptionType implements ExceptionType {

    NOT_FOUND(500, "게시글 투표 옵션이 존재하지 않습니다."),
    UNRELATED_POST(501, "게시글의 투표 옵션이 아닙니다."),
    CONTENT_EMPTY(502, "게시글 옵션 내용은 비어있거나 공백일 수 없습니다."),
    CONTENT_INVALID_LENGTH(503, "게시글 옵션 내용 길이가 유효하지 않습니다."),
    SIZE_EXCEED(504, "최대 게시글 옵션 개수를 초과하였습니다."),
    DUPLICATE_UPDATE(505, "게시글 옵션을 중복해서 수정할 수 없습니다."),
    ;

    private final int code;
    private final String message;

    PostOptionExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
