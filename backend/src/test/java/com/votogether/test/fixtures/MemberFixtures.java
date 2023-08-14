package com.votogether.test.fixtures;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.vo.Gender;
import com.votogether.domain.member.entity.vo.SocialType;

public enum MemberFixtures {

    MALE_UNDER_10("user1", Gender.MALE, 2015, "user1"),
    FEMALE_UNDER_10("user2", Gender.FEMALE, 2015, "user2"),
    MALE_10("user3", Gender.MALE, 2005, "user3"),
    FEMALE_10("user4", Gender.FEMALE, 2005, "user4"),
    MALE_20("user7", Gender.MALE, 1995, "user7"),
    FEMALE_20("user8", Gender.FEMALE, 1995, "user8"),
    MALE_30("user9", Gender.MALE, 1985, "user9"),
    FEMALE_30("user10", Gender.FEMALE, 1985, "user10"),
    MALE_40("user11", Gender.MALE, 1975, "user11"),
    FEMALE_40("user12", Gender.FEMALE, 1975, "user12"),
    MALE_50("user13", Gender.MALE, 1965, "user13"),
    FEMALE_50("user14", Gender.FEMALE, 1965, "user14"),
    MALE_60("user15", Gender.MALE, 1955, "user15"),
    FEMALE_60("user16", Gender.FEMALE, 1955, "user16"),
    MALE_70("user17", Gender.MALE, 1945, "user17"),
    FEMALE_70("user18", Gender.FEMALE, 1945, "user18"),
    MALE_80("user19", Gender.MALE, 1935, "user19"),
    FEMALE_80("user20", Gender.FEMALE, 1935, "user20"),
    MALE_OVER_90("user21", Gender.MALE, 1925, "user21"),
    FEMALE_OVER_90("user22", Gender.FEMALE, 1925, "user22"),
    ;

    private final String nickname;
    private final Gender gender;
    private final Integer birthYear;
    private final String socialId;

    MemberFixtures(final String nickname, final Gender gender, final Integer birthYear, final String socialId) {
        this.nickname = nickname;
        this.gender = gender;
        this.birthYear = birthYear;
        this.socialId = socialId;
    }

    public Member get() {
        return Member.builder()
                .nickname(nickname)
                .gender(gender)
                .birthYear(birthYear)
                .socialType(SocialType.KAKAO)
                .socialId(socialId)
                .build();
    }

}
