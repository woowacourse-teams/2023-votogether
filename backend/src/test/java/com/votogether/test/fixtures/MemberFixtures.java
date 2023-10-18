package com.votogether.test.fixtures;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.vo.Gender;
import com.votogether.domain.member.entity.vo.Role;
import com.votogether.domain.member.entity.vo.SocialType;

public enum MemberFixtures {

    MALE_UNDER_10("user1", Gender.MALE, 2015, "user1", Role.MEMBER),
    FEMALE_UNDER_10("user2", Gender.FEMALE, 2015, "user2", Role.MEMBER),
    MALE_10("user3", Gender.MALE, 2005, "user3", Role.MEMBER),
    FEMALE_10("user4", Gender.FEMALE, 2005, "user4", Role.MEMBER),
    MALE_20("user7", Gender.MALE, 1995, "user7", Role.MEMBER),
    FEMALE_20("user8", Gender.FEMALE, 1995, "user8", Role.MEMBER),
    MALE_30("user9", Gender.MALE, 1985, "user9", Role.MEMBER),
    FEMALE_30("user10", Gender.FEMALE, 1985, "user10", Role.MEMBER),
    MALE_40("user11", Gender.MALE, 1975, "user11", Role.MEMBER),
    FEMALE_40("user12", Gender.FEMALE, 1975, "user12", Role.MEMBER),
    MALE_50("user13", Gender.MALE, 1965, "user13", Role.MEMBER),
    FEMALE_50("user14", Gender.FEMALE, 1965, "user14", Role.MEMBER),
    MALE_60("user15", Gender.MALE, 1955, "user15", Role.MEMBER),
    FEMALE_60("user16", Gender.FEMALE, 1955, "user16", Role.MEMBER),
    MALE_70("user17", Gender.MALE, 1945, "user17", Role.MEMBER),
    FEMALE_70("user18", Gender.FEMALE, 1945, "user18", Role.MEMBER),
    MALE_80("user19", Gender.MALE, 1935, "user19", Role.MEMBER),
    FEMALE_80("user20", Gender.FEMALE, 1935, "user20", Role.MEMBER),
    MALE_OVER_90("user21", Gender.MALE, 1925, "user21", Role.MEMBER),
    FEMALE_OVER_90("user22", Gender.FEMALE, 1925, "user22", Role.MEMBER),
    ;

    private final String nickname;
    private final Gender gender;
    private final Integer birthYear;
    private final String socialId;
    private final Role role;

    MemberFixtures(final String nickname, final Gender gender, final Integer birthYear, final String socialId, final Role role) {
        this.nickname = nickname;
        this.gender = gender;
        this.birthYear = birthYear;
        this.socialId = socialId;
        this.role = role;
    }

    public Member get() {
        return Member.builder()
                .nickname(nickname)
                .gender(gender)
                .birthYear(birthYear)
                .socialType(SocialType.KAKAO)
                .socialId(socialId)
                .role(role)
                .build();
    }

}
