package com.votogether.exception;

import lombok.Getter;

@Getter
public class BaseException extends RuntimeException {

    private final int code;

    public BaseException(final ExceptionType exceptionType) {
        super(exceptionType.getMessage());
        this.code = exceptionType.getCode();
    }

    public BaseException(final int code, final String message) {
        super(message);
        this.code = code;
    }

}
