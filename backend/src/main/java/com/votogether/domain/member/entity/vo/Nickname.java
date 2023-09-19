package com.votogether.domain.member.entity.vo;

import com.votogether.domain.member.exception.MemberExceptionType;
import com.votogether.global.exception.BadRequestException;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.util.regex.Pattern;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Nickname {

    private static final int MINIMUM_NICKNAME_LENGTH = 2;
    private static final int MAXIMUM_NICKNAME_LENGTH = 15;
    private static final Pattern PATTERN = Pattern.compile("^[가-힣a-zA-Z0-9]+$");

    @Column(name = "nickname", length = 20, unique = true, nullable = false)
    private String value;

    public Nickname(final String value) {
        validateNickname(value);
        this.value = value;
    }

    private void validateNickname(final String value) {
        if (value.length() < MINIMUM_NICKNAME_LENGTH || value.length() > MAXIMUM_NICKNAME_LENGTH) {
            throw new BadRequestException(MemberExceptionType.INVALID_NICKNAME_LENGTH);
        }
        if (!PATTERN.matcher(value).matches()) {
            throw new BadRequestException(MemberExceptionType.INVALID_NICKNAME_LETTER);
        }
    }

    public boolean nonStartsWith(final String prefix) {
        return !this.value.startsWith(prefix);
    }

}
