package com.votogether.domain.member.entity;

import com.votogether.domain.member.exception.MemberExceptionType;
import com.votogether.exception.BadRequestException;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.util.regex.Pattern;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Embeddable
public class Nickname {

    private static final int MINIMUM_NICKNAME_LENGTH = 2;
    private static final int MAXIMUM_NICKNAME_LENGTH = 15;

    @Column(name = "nickname", length = 15, unique = true, nullable = false)
    private String value;

    public Nickname(final String nickname) {
        validateNickname(nickname);
        this.value = nickname;
    }

    private void validateNickname(final String nickname) {
        if (nickname.length() < MINIMUM_NICKNAME_LENGTH || nickname.length() > MAXIMUM_NICKNAME_LENGTH) {
            throw new BadRequestException(MemberExceptionType.INVALID_NICKNAME_LENGTH);
        }
        if (!Pattern.matches("^[가-힣a-zA-Z0-9]+$", nickname)) {
            throw new BadRequestException(MemberExceptionType.INVALID_NICKNAME_LETTER);
        }
    }

}
