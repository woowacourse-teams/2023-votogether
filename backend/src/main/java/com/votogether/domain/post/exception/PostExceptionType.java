package com.votogether.domain.post.exception;

import com.votogether.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum PostExceptionType implements ExceptionType {

    POST_NOT_FOUND(1000, "해당 게시글이 존재하지 않습니다."),
    POST_OPTION_NOT_FOUND(1001, "해당 게시글 투표 옵션이 존재하지 않습니다."),
    UNRELATED_POST_OPTION(1002, "게시글 투표 옵션이 게시글과 연관되어 있지 않습니다."),
    NOT_WRITER(1003, "해당 게시글 작성자가 아닙니다."),
    NOT_VOTER(1004, "해당 게시글 작성자는 투표할 수 없습니다."),
    DEADLINE_EXCEED_THREE_DAYS(1005, "마감 기한은 현재 시간으로부터 3일을 초과할 수 없습니다."),
    ;

    private final int code;
    private final String message;

    PostExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
