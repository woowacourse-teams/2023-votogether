package com.votogether.domain.category.exception;

import com.votogether.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum CategoryExceptionType implements ExceptionType {

    NOT_FOUND(4000, "존재하지 않는 카테고리입니다.");

    private final int code;
    private final String message;

    CategoryExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
