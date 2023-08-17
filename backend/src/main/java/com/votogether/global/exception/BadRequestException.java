package com.votogether.global.exception;

public class BadRequestException extends BaseException {

    public BadRequestException(final ExceptionType exceptionType) {
        super(exceptionType);
    }

}
