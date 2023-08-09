package com.votogether.test.persister;

import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;

@RequiredArgsConstructor
@Persister
public class MemberTestPersister {

    private final MemberRepository memberRepository;

    public MemberBuilder builder() {
        return new MemberBuilder();
    }

    public final class MemberBuilder {

        private String nickname;
        private Gender gender;
        private String ageRange;
        private String birthday;
        private SocialType socialType;
        private String socialId;
        private int point;

        public MemberBuilder nickname(String nickname) {
            this.nickname = nickname;
            return this;
        }

        public MemberBuilder gender(Gender gender) {
            this.gender = gender;
            return this;
        }

        public MemberBuilder ageRange(String ageRange) {
            this.ageRange = ageRange;
            return this;
        }

        public MemberBuilder birthday(String birthday) {
            this.birthday = birthday;
            return this;
        }

        public MemberBuilder socialType(SocialType socialType) {
            this.socialType = socialType;
            return this;
        }

        public MemberBuilder socialId(String socialId) {
            this.socialId = socialId;
            return this;
        }

        public MemberBuilder point(int point) {
            this.point = point;
            return this;
        }

        public Member save() {
            Member member = Member.builder()
                    .nickname(nickname == null ? RandomStringUtils.random(10, true, true) : nickname)
                    .gender(gender == null ? Gender.MALE : gender)
                    .ageRange(ageRange == null ? "20~29" : ageRange)
                    .birthday(birthday == null ? "1225" : birthday)
                    .socialType(socialType == null ? SocialType.KAKAO : socialType)
                    .socialId(socialId == null ? "id" : socialId)
                    .point(point)
                    .build();
            return memberRepository.save(member);
        }

    }

}
