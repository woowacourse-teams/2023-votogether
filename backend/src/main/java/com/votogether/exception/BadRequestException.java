package com.votogether.exception;

public class BadRequestException extends BaseException {

    public BadRequestException(final ExceptionType exceptionType) {
        super(exceptionType);
    }

    public BadRequestException(final int code, final String message) {
        super(code, message);
    }

}
