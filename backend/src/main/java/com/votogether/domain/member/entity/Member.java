package com.votogether.domain.member.entity;

import com.votogether.domain.auth.dto.KakaoMemberResponse;
import com.votogether.domain.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.apache.commons.lang3.RandomStringUtils;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = {"id"})
@ToString
@Getter
@Entity
public class Member extends BaseEntity {

    private static final String INITIAL_NICKNAME_PREFIX = "익명의손님";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private Nickname nickname;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20)
    private Gender gender;

    @Column
    private Integer birthYear;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private SocialType socialType;

    @Column(nullable = false)
    private String socialId;

    @Builder
    private Member(
            final String nickname,
            final Gender gender,
            final Integer birthYear,
            final SocialType socialType,
            final String socialId
    ) {
        this.nickname = new Nickname(nickname);
        this.gender = gender;
        this.birthYear = birthYear;
        this.socialType = socialType;
        this.socialId = socialId;
    }

    public static Member from(final KakaoMemberResponse response) {
        return Member.builder()
                .nickname(INITIAL_NICKNAME_PREFIX + RandomStringUtils.random(10, true, true))
                .socialType(SocialType.KAKAO)
                .socialId(String.valueOf(response.id()))
                .build();
    }

    public void changeNickname(final String nickname) {
        this.nickname = new Nickname(nickname);
    }

    public void changeNicknameByReport() {
        final String reportedNickname = "Pause1" + RandomStringUtils.random(9, true, true);
        this.nickname = new Nickname(reportedNickname);
    }

    public void updateGender(final Gender gender) {
        this.gender = gender;
    }

    public void updateBirthYear(final Integer birthYear) {
        this.birthYear = birthYear;
    }

    public String getNickname() {
        return this.nickname.getValue();
    }

}
