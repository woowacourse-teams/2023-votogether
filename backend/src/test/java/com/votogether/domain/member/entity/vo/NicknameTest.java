package com.votogether.domain.member.entity.vo;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.global.exception.BadRequestException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class NicknameTest {

    @Test
    @DisplayName("닉네임이 정상적으로 만들어진다.")
    void create() {
        // given
        String value = "안녕";

        // when
        Nickname nickname = new Nickname(value);

        // then
        assertThat(nickname.getValue()).isEqualTo(value);
    }

    @ParameterizedTest
    @ValueSource(strings = {"안", "", " ", "가나다라마바사아자차카타파하기니"})
    @DisplayName("닉네임의 길이가 맞지 않으면 예외가 발생한다.")
    void validateLength(String value) {
        // when, then
        assertThatThrownBy(() -> new Nickname(value))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("닉네임의 길이가 올바르지 않습니다.");
    }

    @ParameterizedTest
    @ValueSource(strings = {"저문@", "다%즐", ".루쿠", "아 벨"})
    @DisplayName("한글, 영어, 숫자가 이외의 글자가 포함되어 있으면 예외를 던진다.")
    void validateInvalidLetter(String value) {
        // when, then
        assertThatThrownBy(() -> new Nickname(value))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("닉네임에 들어갈 수 없는 문자가 포함되어 있습니다.");
    }

}
