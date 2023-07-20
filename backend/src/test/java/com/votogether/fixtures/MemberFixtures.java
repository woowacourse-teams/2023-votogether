package com.votogether.fixtures;

import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;

public class MemberFixtures {

    public static final Member MALE_UNDER_10 = Member.builder()
            .nickname("user1")
            .gender(Gender.MALE)
            .birthday("1225")
            .ageRange("1~9")
            .socialType(SocialType.GOOGLE)
            .socialId("user1@gmail.com")
            .point(0)
            .build();

    public static final Member FEMALE_UNDER_10 = Member.builder()
            .nickname("user2")
            .gender(Gender.FEMALE)
            .birthday("1225")
            .ageRange("1~9")
            .socialType(SocialType.GOOGLE)
            .socialId("user2@gmail.com")
            .point(0)
            .build();

    public static final Member MALE_EARLY_10 = Member.builder()
            .nickname("user3")
            .gender(Gender.MALE)
            .birthday("1225")
            .ageRange("10~14")
            .socialType(SocialType.GOOGLE)
            .socialId("user3@gmail.com")
            .point(0)
            .build();

    public static final Member FEMALE_EARLY_10 = Member.builder()
            .nickname("user4")
            .gender(Gender.FEMALE)
            .birthday("1225")
            .ageRange("10~14")
            .socialType(SocialType.GOOGLE)
            .socialId("user4@gmail.com")
            .point(0)
            .build();

    public static final Member MALE_LATE_10 = Member.builder()
            .nickname("user5")
            .gender(Gender.MALE)
            .birthday("1225")
            .ageRange("15~19")
            .socialType(SocialType.GOOGLE)
            .socialId("user5@gmail.com")
            .point(0)
            .build();

    public static final Member FEMALE_LATE_10 = Member.builder()
            .nickname("user6")
            .gender(Gender.FEMALE)
            .birthday("1225")
            .ageRange("15~19")
            .socialType(SocialType.GOOGLE)
            .socialId("user6@gmail.com")
            .point(0)
            .build();

    public static final Member MALE_20 = Member.builder()
            .nickname("user7")
            .gender(Gender.MALE)
            .birthday("1225")
            .ageRange("20~29")
            .socialType(SocialType.GOOGLE)
            .socialId("user7@gmail.com")
            .point(0)
            .build();

    public static final Member FEMALE_20 = Member.builder()
            .nickname("user8")
            .gender(Gender.FEMALE)
            .birthday("1225")
            .ageRange("20~29")
            .socialType(SocialType.GOOGLE)
            .socialId("user8@gmail.com")
            .point(0)
            .build();

    public static final Member MALE_30 = Member.builder()
            .nickname("user9")
            .gender(Gender.MALE)
            .birthday("1225")
            .ageRange("30~39")
            .socialType(SocialType.GOOGLE)
            .socialId("user9@gmail.com")
            .point(0)
            .build();

    public static final Member FEMALE_30 = Member.builder()
            .nickname("user10")
            .gender(Gender.FEMALE)
            .birthday("1225")
            .ageRange("30~39")
            .socialType(SocialType.GOOGLE)
            .socialId("user10@gmail.com")
            .point(0)
            .build();

    public static final Member MALE_40 = Member.builder()
            .nickname("user11")
            .gender(Gender.MALE)
            .birthday("1225")
            .ageRange("40~49")
            .socialType(SocialType.GOOGLE)
            .socialId("user11@gmail.com")
            .point(0)
            .build();

    public static final Member FEMALE_40 = Member.builder()
            .nickname("user12")
            .gender(Gender.FEMALE)
            .birthday("1225")
            .ageRange("40~49")
            .socialType(SocialType.GOOGLE)
            .socialId("user12@gmail.com")
            .point(0)
            .build();

    public static final Member MALE_50 = Member.builder()
            .nickname("user13")
            .gender(Gender.MALE)
            .birthday("1225")
            .ageRange("50~59")
            .socialType(SocialType.GOOGLE)
            .socialId("user13@gmail.com")
            .point(0)
            .build();

    public static final Member FEMALE_50 = Member.builder()
            .nickname("user14")
            .gender(Gender.FEMALE)
            .birthday("1225")
            .ageRange("50~59")
            .socialType(SocialType.GOOGLE)
            .socialId("user14@gmail.com")
            .point(0)
            .build();

    public static final Member MALE_60 = Member.builder()
            .nickname("user15")
            .gender(Gender.MALE)
            .birthday("1225")
            .ageRange("60~69")
            .socialType(SocialType.GOOGLE)
            .socialId("user15@gmail.com")
            .point(0)
            .build();

    public static final Member FEMALE_60 = Member.builder()
            .nickname("user16")
            .gender(Gender.FEMALE)
            .birthday("1225")
            .ageRange("60~69")
            .socialType(SocialType.GOOGLE)
            .socialId("user16@gmail.com")
            .point(0)
            .build();

    public static final Member MALE_70 = Member.builder()
            .nickname("user17")
            .gender(Gender.MALE)
            .birthday("1225")
            .ageRange("70~79")
            .socialType(SocialType.GOOGLE)
            .socialId("user17@gmail.com")
            .point(0)
            .build();

    public static final Member FEMALE_70 = Member.builder()
            .nickname("user18")
            .gender(Gender.FEMALE)
            .birthday("1225")
            .ageRange("70~79")
            .socialType(SocialType.GOOGLE)
            .socialId("user18@gmail.com")
            .point(0)
            .build();

    public static final Member MALE_80 = Member.builder()
            .nickname("user19")
            .gender(Gender.MALE)
            .birthday("1225")
            .ageRange("80~89")
            .socialType(SocialType.GOOGLE)
            .socialId("user19@gmail.com")
            .point(0)
            .build();

    public static final Member FEMALE_80 = Member.builder()
            .nickname("user20")
            .gender(Gender.FEMALE)
            .birthday("1225")
            .ageRange("80~89")
            .socialType(SocialType.GOOGLE)
            .socialId("user20@gmail.com")
            .point(0)
            .build();

    public static final Member MALE_OVER_90 = Member.builder()
            .nickname("user21")
            .gender(Gender.MALE)
            .birthday("1225")
            .ageRange("90~")
            .socialType(SocialType.GOOGLE)
            .socialId("user21@gmail.com")
            .point(0)
            .build();

    public static final Member FEMALE_OVER_90 = Member.builder()
            .nickname("user22")
            .gender(Gender.FEMALE)
            .birthday("1225")
            .ageRange("90~")
            .socialType(SocialType.GOOGLE)
            .socialId("user22@gmail.com")
            .point(0)
            .build();

}
