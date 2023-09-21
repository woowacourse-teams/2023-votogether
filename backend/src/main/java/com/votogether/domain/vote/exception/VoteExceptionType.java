package com.votogether.domain.vote.exception;

import com.votogether.global.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum VoteExceptionType implements ExceptionType {

    CANNOT_VOTE_MY_POST(700, "해당 게시글 작성자는 투표할 수 없습니다."),
    NOT_FOUND(701, "참여한 투표가 존재하지 않습니다."),
    ALREADY_VOTED(702, "이미 참여한 투표입니다."),
    ;


    private final int code;
    private final String message;

    VoteExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
