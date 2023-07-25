package com.votogether.fixtures;

import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;

public enum MemberFixtures {

    MALE_UNDER_10("user1", Gender.MALE, "1~9", "user1"),
    FEMALE_UNDER_10("user2", Gender.FEMALE, "1~9", "user2"),
    MALE_EARLY_10("user3", Gender.MALE, "10~14", "user3"),
    FEMALE_EARLY_10("user4", Gender.FEMALE, "10~14", "user4"),
    MALE_LATE_10("user5", Gender.MALE, "15~19", "user5"),
    FEMALE_LATE_10("user6", Gender.FEMALE, "15~19", "user6"),
    MALE_20("user7", Gender.MALE, "20~29", "user7"),
    FEMALE_20("user8", Gender.FEMALE, "20~29", "user8"),
    MALE_30("user9", Gender.MALE, "30~39", "user9"),
    FEMALE_30("user10", Gender.FEMALE, "30~39", "user10"),
    MALE_40("user11", Gender.MALE, "40~49", "user11"),
    FEMALE_40("user12", Gender.FEMALE, "40~49", "user12"),
    MALE_50("user13", Gender.MALE, "50~59", "user13"),
    FEMALE_50("user14", Gender.FEMALE, "50~59", "user14"),
    MALE_60("user15", Gender.MALE, "60~69", "user15"),
    FEMALE_60("user16", Gender.FEMALE, "60~69", "user16"),
    MALE_70("user17", Gender.MALE, "70~79", "user17"),
    FEMALE_70("user18", Gender.FEMALE, "70~79", "user18"),
    MALE_80("user19", Gender.MALE, "80~89", "user19"),
    FEMALE_80("user20", Gender.FEMALE, "80~89", "user20"),
    MALE_OVER_90("user21", Gender.MALE, "90~", "user21"),
    FEMALE_OVER_90("user22", Gender.FEMALE, "90~", "user22"),
    ;

    private final String nickname;
    private final Gender gender;
    private final String ageRange;
    private final String socialId;

    MemberFixtures(final String nickname, final Gender gender, final String ageRange, final String socialId) {
        this.nickname = nickname;
        this.gender = gender;
        this.ageRange = ageRange;
        this.socialId = socialId;
    }

    public Member get() {
        return Member.builder()
                .nickname(nickname)
                .gender(gender)
                .birthday("1225")
                .ageRange(ageRange)
                .socialType(SocialType.KAKAO)
                .socialId(socialId)
                .point(0)
                .build();
    }

}
