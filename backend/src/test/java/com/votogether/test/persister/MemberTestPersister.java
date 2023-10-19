package com.votogether.test.persister;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.vo.Gender;
import com.votogether.domain.member.entity.vo.Roles;
import com.votogether.domain.member.entity.vo.SocialType;
import com.votogether.domain.member.repository.MemberRepository;
import java.time.LocalDateTime;
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
        private Integer birthYear;
        private SocialType socialType;
        private String socialId;
        private Roles roles;
        private LocalDateTime alarmCheckedAt;

        public MemberBuilder nickname(String nickname) {
            this.nickname = nickname;
            return this;
        }

        public MemberBuilder gender(Gender gender) {
            this.gender = gender;
            return this;
        }

        public MemberBuilder birthYear(Integer birthYear) {
            this.birthYear = birthYear;
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

        public MemberBuilder roles(Roles roles) {
            this.roles = roles;
            return this;
        }

        public MemberBuilder alarmCheckedAt(LocalDateTime alarmCheckedAt) {
            this.alarmCheckedAt = alarmCheckedAt;
            return this;
        }

        public Member save() {
            Member member = Member.builder()
                    .nickname(nickname == null ? RandomStringUtils.random(10, true, true) : nickname)
                    .gender(gender == null ? Gender.MALE : gender)
                    .birthYear(birthYear == null ? 1995 : birthYear)
                    .socialType(socialType == null ? SocialType.KAKAO : socialType)
                    .socialId(socialId == null ? RandomStringUtils.random(10, true, true) : socialId)
                    .roles(roles == null ? Roles.MEMBER : roles)
                    .alarmCheckedAt(alarmCheckedAt == null ? LocalDateTime.now() : alarmCheckedAt)
                    .build();
            return memberRepository.save(member);
        }

    }

}
