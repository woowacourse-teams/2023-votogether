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

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = {"id"})
@ToString
@Getter
@Entity
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private Nickname nickname;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private Gender gender;

    @Column(nullable = false)
    private String ageRange;

    @Column(nullable = false)
    private String birthday;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private SocialType socialType;

    @Column(nullable = false)
    private String socialId;

    @Column(nullable = false)
    private int point;

    @Builder
    private Member(
            final String nickname,
            final Gender gender,
            final String ageRange,
            final String birthday,
            final SocialType socialType,
            final String socialId,
            final Integer point
    ) {
        this.nickname = new Nickname(nickname);
        this.gender = gender;
        this.ageRange = ageRange;
        this.birthday = birthday;
        this.socialType = socialType;
        this.socialId = socialId;
        this.point = point;
    }

    public static Member from(final KakaoMemberResponse response) {
        final NicknameNumberGenerator nicknameNumberGenerator = new NicknameNumberGenerator();
        return Member.builder()
                .nickname("익명의 손님" + nicknameNumberGenerator.generate())
                .gender(Gender.valueOf(response.kakaoAccount().gender().toUpperCase()))
                .ageRange(response.kakaoAccount().ageRange())
                .birthday(response.kakaoAccount().birthday())
                .socialType(SocialType.KAKAO)
                .socialId(String.valueOf(response.id()))
                .point(0)
                .build();
    }

    public void plusPoint(final int point) {
        this.point = this.point + point;
    }

    public void changeNickname(final String nickname) {
        this.nickname = new Nickname(nickname);
    }

}
