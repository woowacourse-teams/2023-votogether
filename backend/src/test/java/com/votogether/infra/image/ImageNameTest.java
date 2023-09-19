package com.votogether.infra.image;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.global.exception.ImageException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;

class ImageNameTest {

    @Nested
    @DisplayName("이미지명 생성")
    class ImageNameCreate {

        @Test
        @DisplayName("파일 이름이 정상적이면 이미지명을 생성한다.")
        void success() {
            // given
            String fileName = "image.png";

            // when
            String result = ImageName.from(fileName);

            // then
            assertThat(result).contains(".png");
        }

        @ParameterizedTest
        @NullAndEmptySource
        @DisplayName("파일 이름이 존재하지 않거나 비어있으면 예외를 던진다.")
        void emptyFileName(String fileName) {
            // given, when, then
            assertThatThrownBy(() -> ImageName.from(fileName))
                    .isInstanceOf(ImageException.class)
                    .hasMessage("원본 이미지명이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("확장자가 존재하지 않으면 예외를 던진다")
        void emptyExtension() {
            // given
            String fileName = "image";

            // when, then
            assertThatThrownBy(() -> ImageName.from(fileName))
                    .isInstanceOf(ImageException.class)
                    .hasMessage("이미지 확장자가 존재하지 않습니다.");
        }

        @Test
        @DisplayName("확장자가 이미지 확장자가 아니라면 예외를 던진다.")
        void invalidExtension() {
            // given
            String fileName = "image.txt";

            // when, then
            assertThatThrownBy(() -> ImageName.from(fileName))
                    .isInstanceOf(ImageException.class)
                    .hasMessage("이미지 파일만 업로드할 수 있습니다.");
        }

    }

}
