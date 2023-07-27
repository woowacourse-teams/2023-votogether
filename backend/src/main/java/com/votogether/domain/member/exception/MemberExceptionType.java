package com.votogether.domain.member.exception;

import com.votogether.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum MemberExceptionType implements ExceptionType {

    INVALID_NICKNAME_LENGTH(800, "닉네임의 길이가 올바르지 않습니다."),
    INVALID_NICKNAME_LETTER(801, "닉네임에 들어갈 수 없는 문자가 포함되어 있습니다."),
    DUPLICATED_NICKNAME_BEFORE(802, "변경할 닉네임은 이전 닉네임과 동일할 수 없습니다."),
    ALREADY_EXISTENT_NICKNAME(803, "이미 중복된 닉네임이 존재합니다."),
    NONEXISTENT_MEMBER(804, "해당 회원이 존재하지 않습니다.");

    private final int code;
    private final String message;

    MemberExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
