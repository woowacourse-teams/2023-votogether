package com.votogether.domain.member.entity;

import com.votogether.domain.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
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

    @Column(length = 15, nullable = false)
    private String nickname;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private Gender gender;

    @Column(nullable = false)
    private LocalDateTime birthDate;

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
            final LocalDateTime birthDate,
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

    public void plusPoint(final int point) {
        this.point = this.point + point;
    }

}
