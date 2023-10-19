package com.votogether.domain.member.entity;

import com.votogether.domain.auth.dto.response.KakaoMemberResponse;
import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.member.entity.vo.Gender;
import com.votogether.domain.member.entity.vo.Nickname;
import com.votogether.domain.member.entity.vo.Roles;
import com.votogether.domain.member.entity.vo.SocialType;
import com.votogether.domain.member.exception.MemberExceptionType;
import com.votogether.global.exception.BadRequestException;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;

@Getter
@Entity
@EqualsAndHashCode(of = {"id"}, callSuper = false)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(indexes = {@Index(columnList = "socialId, socialType")})
public class Member extends BaseEntity {

    private static final String INITIAL_NICKNAME_PREFIX = "익명의손님";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private Nickname nickname;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Gender gender;

    private Integer birthYear;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private SocialType socialType;

    @Column(nullable = false)
    private String socialId;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private Roles roles;

    @Column(columnDefinition = "datetime(6)", nullable = false)
    private LocalDateTime alarmCheckedAt;

    @Builder
    private Member(
            final String nickname,
            final Gender gender,
            final Integer birthYear,
            final SocialType socialType,
            final String socialId,
            final Roles roles,
            final LocalDateTime alarmCheckedAt
    ) {
        this.nickname = new Nickname(nickname);
        this.gender = gender;
        this.birthYear = birthYear;
        this.socialType = socialType;
        this.socialId = socialId;
        this.roles = roles;
        this.alarmCheckedAt = alarmCheckedAt;
    }

    public static Member from(final KakaoMemberResponse response) {
        return Member.builder()
                .nickname(INITIAL_NICKNAME_PREFIX + RandomStringUtils.random(10, true, true))
                .socialType(SocialType.KAKAO)
                .socialId(String.valueOf(response.id()))
                .roles(Roles.MEMBER)
                .alarmCheckedAt(LocalDateTime.now())
                .build();
    }

    public void changeNicknameByCycle(final String nickname, final Long days) {
        if (nickname.startsWith(INITIAL_NICKNAME_PREFIX)) {
            throw new BadRequestException(MemberExceptionType.NOT_ALLOWED_INITIAL_NICKNAME_PREFIX);
        }
        if (isNotPassedChangingCycle(days) && isNotInitialNickname()) {
            throw new BadRequestException(MemberExceptionType.NOT_PASSED_NICKNAME_CHANGING_CYCLE);
        }
        this.nickname = new Nickname(nickname);
    }

    private boolean isNotPassedChangingCycle(final Long days) {
        return this.getUpdatedAt().isAfter(LocalDateTime.now().minusDays(days));
    }

    private boolean isNotInitialNickname() {
        return this.nickname.nonStartsWith(INITIAL_NICKNAME_PREFIX);
    }

    public void changeNicknameByReport() {
        final String reportedNickname = "Pause1" + RandomStringUtils.random(9, true, true);
        this.nickname = new Nickname(reportedNickname);
    }

    public void updateDetails(final Gender gender, final Integer birthYear) {
        this.gender = gender;
        this.birthYear = birthYear;
    }

    public boolean hasEssentialInfo() {
        return (this.gender != null && this.birthYear != null);
    }

    public boolean hasLatestAlarmCompareTo(final LocalDateTime latestAlarmCreatedAt) {
        return alarmCheckedAt.isBefore(latestAlarmCreatedAt);
    }

    public void checkAlarm() {
        alarmCheckedAt = LocalDateTime.now();
    }

    public String getNickname() {
        return this.nickname.getValue();
    }

}
