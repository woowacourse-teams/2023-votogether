package com.votogether.infra.image;

import com.votogether.global.exception.ExceptionType;
import lombok.Getter;

@Getter
public enum ImageExceptionType implements ExceptionType {

    INVALID_IMAGE_READ(1000, "이미지를 정상적으로 읽을 수 없습니다."),
    IMAGE_NAME_BLANK(1001, "원본 이미지명이 존재하지 않습니다."),
    IMAGE_FORMAT(1002, "이미지 확장자가 존재하지 않습니다."),
    IMAGE_EXTENSION(1003, "이미지 파일만 업로드할 수 있습니다."),
    IMAGE_TRANSFER(1004, "이미지 업로드에 실패했습니다."),
    IMAGE_URL(1005, "이미지 URL을 확인할 수 없습니다."),
    ;

    private final int code;
    private final String message;

    ImageExceptionType(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

}
