package com.votogether.domain.member.entity.vo;

import com.votogether.domain.member.exception.MemberExceptionType;
import com.votogether.global.exception.BadRequestException;
import java.util.Arrays;
import lombok.Getter;

@Getter
public enum AgeRange {

    UNDER_TEENS("10대 미만", 0),
    TEENS("10대", 1),
    TWENTIES("20대", 2),
    THIRTIES("30대", 3),
    FORTIES("40대", 4),
    FIFTIES("50대", 5),
    OVER_SIXTIES("60대 이상", 6),
    ;

    private final String name;
    private final int ageGroup;

    AgeRange(final String name, final int ageGroup) {
        this.name = name;
        this.ageGroup = ageGroup;
    }

    public static AgeRange from(final int ageGroup) {
        return Arrays.stream(AgeRange.values())
                .filter(ageRange -> ageRange.ageGroup == ageGroup)
                .findAny()
                .orElseThrow(() -> new BadRequestException(MemberExceptionType.INVALID_AGE));
    }

}
