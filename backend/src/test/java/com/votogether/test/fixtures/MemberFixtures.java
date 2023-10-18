package com.votogether.test.fixtures;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.vo.Gender;
import com.votogether.domain.member.entity.vo.Roles;
import com.votogether.domain.member.entity.vo.SocialType;

public enum MemberFixtures {

    MALE_UNDER_10("user1", Gender.MALE, 2015, "user1", Roles.MEMBER),
    FEMALE_UNDER_10("user2", Gender.FEMALE, 2015, "user2", Roles.MEMBER),
    MALE_10("user3", Gender.MALE, 2005, "user3", Roles.MEMBER),
    FEMALE_10("user4", Gender.FEMALE, 2005, "user4", Roles.MEMBER),
    MALE_20("user7", Gender.MALE, 1995, "user7", Roles.MEMBER),
    FEMALE_20("user8", Gender.FEMALE, 1995, "user8", Roles.MEMBER),
    MALE_30("user9", Gender.MALE, 1985, "user9", Roles.MEMBER),
    FEMALE_30("user10", Gender.FEMALE, 1985, "user10", Roles.MEMBER),
    MALE_40("user11", Gender.MALE, 1975, "user11", Roles.MEMBER),
    FEMALE_40("user12", Gender.FEMALE, 1975, "user12", Roles.MEMBER),
    MALE_50("user13", Gender.MALE, 1965, "user13", Roles.MEMBER),
    FEMALE_50("user14", Gender.FEMALE, 1965, "user14", Roles.MEMBER),
    MALE_60("user15", Gender.MALE, 1955, "user15", Roles.MEMBER),
    FEMALE_60("user16", Gender.FEMALE, 1955, "user16", Roles.MEMBER),
    MALE_70("user17", Gender.MALE, 1945, "user17", Roles.MEMBER),
    FEMALE_70("user18", Gender.FEMALE, 1945, "user18", Roles.MEMBER),
    MALE_80("user19", Gender.MALE, 1935, "user19", Roles.MEMBER),
    FEMALE_80("user20", Gender.FEMALE, 1935, "user20", Roles.MEMBER),
    MALE_OVER_90("user21", Gender.MALE, 1925, "user21", Roles.MEMBER),
    FEMALE_OVER_90("user22", Gender.FEMALE, 1925, "user22", Roles.MEMBER),
    ;

    private final String nickname;
    private final Gender gender;
    private final Integer birthYear;
    private final String socialId;
    private final Roles roles;

    MemberFixtures(
            final String nickname,
            final Gender gender,
            final Integer birthYear,
            final String socialId,
            final Roles roles
    ) {
        this.nickname = nickname;
        this.gender = gender;
        this.birthYear = birthYear;
        this.socialId = socialId;
        this.roles = roles;
    }

    public Member get() {
        return Member.builder()
                .nickname(nickname)
                .gender(gender)
                .birthYear(birthYear)
                .socialType(SocialType.KAKAO)
                .socialId(socialId)
                .roles(roles)
                .build();
    }

}
