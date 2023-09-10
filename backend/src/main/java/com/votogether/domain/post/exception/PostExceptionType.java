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
    DEADLINE_EXCEED(505, "최대 마감기간을 초과하였습니다."),
    WRONG_IMAGE(506, "이미지 저장에 실패했습니다. 다시 시도해주세요."),
    FAIL_DELETE_EXCEED(507, "일정 투표 수 이상의 게시글은 삭제할 수 없습니다."),
    FAIL_UPDATE_VOTED_POST(508, "투표된 게시글은 수정할 수 없습니다."),
    POST_TITLE_EMPTY(509, "게시글 제목은 비어있거나 공백일 수 없습니다."),
    POST_CONTENT_EMPTY(510, "게시글 내용은 비어있거나 공백일 수 없습니다."),
    POST_TITLE_INVALID_LENGTH(511, "게시글 제목 길이가 유효하지 않습니다."),
    POST_CONTENT_INVALID_LENGTH(512, "게시글 내용 길이가 유효하지 않습니다."),
    POST_IS_HIDDEN(513, "신고에 의해 숨겨진 게시글은 접근할 수 없습니다."),
    ;

    private final int code;
    private final String message;

    PostExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
