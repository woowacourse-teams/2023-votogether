package com.votogether.domain.member.exception;

import com.votogether.global.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum MemberExceptionType implements ExceptionType {

    INVALID_NICKNAME_LENGTH(800, "닉네임의 길이가 올바르지 않습니다."),
    INVALID_NICKNAME_LETTER(801, "닉네임에 들어갈 수 없는 문자가 포함되어 있습니다."),
    ALREADY_EXISTENT_NICKNAME(802, "이미 중복된 닉네임이 존재합니다."),
    NON_EXISTENT_MEMBER(803, "해당 회원이 존재하지 않습니다."),
    INVALID_AGE(804, "존재할 수 없는 연령입니다."),
    ALREADY_ASSIGNED_GENDER(805, "이미 성별이 할당되어 있습니다."),
    ALREADY_ASSIGNED_BIRTH_YEAR(806, "이미 출생년도가 할당되어 있습니다."),
    NOT_PASSED_NICKNAME_CHANGING_CYCLE(807, "최소 닉네임 변경주기가 지나지 않았습니다."),
    NOT_ALLOWED_INITIAL_NICKNAME_PREFIX(808, "초기 닉네임에 포함된 접두어로 닉네임을 변경할 수 없습니다."),
    INVALID_VOTE_COUNT(809, "수정 가능한 투표 수는 0이상이어야 합니다."),
    NOT_FOUND_METRIC(810, "메트릭 정보가 존재하지 않습니다."),
    ;

    private final int code;
    private final String message;

    MemberExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
