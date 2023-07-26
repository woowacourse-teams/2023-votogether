package com.votogether.exception;

public record ExceptionResponse(int code, String message) {

    public static ExceptionResponse from(final BaseException e) {
        return new ExceptionResponse(e.getCode(), e.getMessage());
    }

}
