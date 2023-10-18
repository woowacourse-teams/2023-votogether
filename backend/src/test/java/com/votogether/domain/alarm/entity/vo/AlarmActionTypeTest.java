package com.votogether.domain.alarm.entity.vo;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.global.exception.BadRequestException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class AlarmActionTypeTest {

    @Nested
    @DisplayName("타입으로 부터 알림 액션 타입을 생성할 때")
    class From {

        @ParameterizedTest
        @ValueSource(strings = {"CONTENT", "REPORT"})
        @DisplayName("존재하는 타입이라면 액션 타입을 반환한다.")
        void existType(String type) {
            // given, when
            AlarmActionType alarmActionType = AlarmActionType.from(type);

            // then
            assertThat(alarmActionType).isEqualTo(AlarmActionType.valueOf(type));
        }

        @Test
        @DisplayName("존재하지 않은 타입이라면 예외를 던진다.")
        void notExistType() {
            // given
            String type = "HELLO";

            // when, then
            assertThatThrownBy(() -> AlarmActionType.from(type))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("등록되지 않은 알림 동작입니다.");
        }

    }

}
