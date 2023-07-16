package com.votogether.domain.member.entity;

import com.votogether.domain.auth.dto.KakaoMemberResponse;
import com.votogether.domain.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 15, unique = true, nullable = false)
    private String nickname;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private Gender gender;

    @Column(nullable = false)
    private String birthDate;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private SocialType socialType;

    @Column(nullable = false)
    private String socialId;

    @Column(nullable = false)
    private Integer point;

    @Builder
    private Member(
            final String nickname,
            final String birthDate,
            final Gender gender,
            final SocialType socialType,
            final String socialId,
            final Integer point
    ) {
        this.nickname = nickname;
        this.birthDate = birthDate;
        this.gender = gender;
        this.socialType = socialType;
        this.socialId = socialId;
        this.point = point;
    }

    public static Member createKakaoMember(final KakaoMemberResponse response) {
        final NicknameNumberGenerator nicknameNumberGenerator = new NicknameNumberGenerator();
        return Member.builder()
                .nickname("익명의 손님" + nicknameNumberGenerator.generate())
                .gender(Gender.valueOf(response.getKakaoAccount().getGender().toUpperCase()))
                .birthDate(response.getKakaoAccount().getBirthday())
                .socialType(SocialType.KAKAO)
                .socialId(String.valueOf(response.getId()))
                .point(0)
                .build();
    }

}
