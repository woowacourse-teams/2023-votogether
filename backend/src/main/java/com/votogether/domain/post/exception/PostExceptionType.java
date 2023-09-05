package com.votogether.domain.post.exception;

import com.votogether.global.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum PostExceptionType implements ExceptionType {

    POST_NOT_FOUND(500, "게시글이 존재하지 않습니다."),
    POST_OPTION_NOT_FOUND(501, "게시글 투표 옵션이 존재하지 않습니다."),
    UNRELATED_POST_OPTION(502, "게시글의 투표 옵션이 아닙니다."),
    POST_NOT_WRITER(503, "게시글 작성자가 아닙니다."),
    POST_CLOSED(504, "게시글이 마감되었습니다."),
    DEADLINE_EXCEED_THREE_DAYS(505, "마감 기한은 3일을 초과할 수 없습니다."),
    WRONG_IMAGE(506, "이미지 저장에 실패했습니다. 다시 시도해주세요."),
    FAIL_DELETE_EXCEED_TWENTY_VOTE_COUNT(507, "투표 수가 20이상이면 게시글을 삭제할 수 없습니다."),
    FAIL_UPDATE_VOTED_POST(508, "투표된 게시글은 수정할 수 없습니다.");

    private final int code;
    private final String message;

    PostExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
