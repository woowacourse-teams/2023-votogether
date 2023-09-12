package com.votogether.domain.member.entity.vo;

import com.votogether.domain.member.exception.MemberExceptionType;
import com.votogether.global.exception.BadRequestException;
import java.util.Arrays;
import lombok.Getter;

@Getter
public enum AgeRange {

    UNDER_TEENS("10대 미만", 1, 9),
    TEENS("10대", 10, 19),
    TWENTIES("20대", 20, 29),
    THIRTIES("30대", 30, 39),
    FORTIES("40대", 40, 49),
    FIFTIES("50대", 50, 59),
    OVER_SIXTIES("60대 이상", 60, 999),
    ;

    private final String name;
    private final int startAge;
    private final int endAge;

    AgeRange(
            final String name,
            final int startAge,
            final int endAge
    ) {
        this.name = name;
        this.startAge = startAge;
        this.endAge = endAge;
    }

    public static AgeRange from(final int age) {
        return Arrays.stream(AgeRange.values())
                .filter(ageRange -> ageRange.isBelong(age))
                .findAny()
                .orElseThrow(() -> new BadRequestException(MemberExceptionType.INVALID_AGE));
    }

    private boolean isBelong(final int age) {
        return this.startAge <= age && this.endAge >= age;
    }

}
