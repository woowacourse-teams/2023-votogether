package com.votogether.exception;

public record ExceptionResponse(int code, String message) {

    public static ExceptionResponse from(final BaseException e) {
        final ExceptionType exceptionType = e.getExceptionType();
        return new ExceptionResponse(exceptionType.getCode(), exceptionType.getMessage());
    }

}
