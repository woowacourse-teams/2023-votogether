package com.votogether.domain.category.exception;

import com.votogether.global.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum CategoryExceptionType implements ExceptionType {

    NOT_FOUND(800, "해당 카테고리가 존재하지 않습니다."),
    EXIST_LIKE_CATEGORY(801, "이미 선호 카테고리에 등록되어 있습니다."),
    NOT_LIKE_CATEGORY(802, "해당 카테고리는 선호 카테고리가 아닙니다.");

    private final int code;
    private final String message;

    CategoryExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
