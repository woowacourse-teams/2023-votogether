package com.votogether.exception;

public class NotFoundException extends BaseException {

    public NotFoundException(final ExceptionType exceptionType) {
        super(exceptionType);
    }

}
