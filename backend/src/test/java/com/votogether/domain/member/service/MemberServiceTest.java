package com.votogether.domain.member.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.ServiceTest;
import com.votogether.domain.member.dto.MemberDetailRequest;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.exception.BadRequestException;
import com.votogether.fixtures.MemberFixtures;
import com.votogether.test.persister.MemberTestPersister;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;

@ServiceTest
class MemberServiceTest {

    @Autowired
    MemberService memberService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberTestPersister memberTestPersister;

    @Test
    @DisplayName("멤버가 존재하지 않으면 저장한다.")
    void register() {
        // given
        Member member = MemberFixtures.FEMALE_20.get();

        // when
        Member registeredMember = memberService.register(member);

        // then
        assertThat(registeredMember.getId()).isNotNull();
    }

    @Nested
    @DisplayName("변경할 회원의 닉네임이")
    class ChangeNickname {

        @Test
        @DisplayName("주어질 때 정상적으로 닉네임을 변경한다.")
        void changeNickname() {
            // given
            String newNickname = "jeomxon";
            Member member = memberRepository.save(MemberFixtures.FEMALE_30.get());

            // when
            memberService.changeNickname(member, newNickname);

            // then
            assertThat(member.getNickname()).isEqualTo(newNickname);
        }

        @ParameterizedTest
        @ValueSource(strings = {"j", "abcdefabcdefabcdeff", ""})
        @DisplayName("올바르지 않은 길이라면 예외가 발생한다.")
        void changeNicknameThrowsExceptionInvalidLength(String newNickname) {
            // given
            Member member = memberRepository.save(MemberFixtures.FEMALE_30.get());

            // when, then
            assertThatThrownBy(() -> memberService.changeNickname(member, newNickname))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("닉네임의 길이가 올바르지 않습니다.");
        }

        @ParameterizedTest
        @ValueSource(strings = {"(((", "%%$%^^^", "12vvv^vvvd"})
        @DisplayName("한글, 영어, 숫자 이외의 문자가 포함되어있다면 예외가 발생한다.")
        void changeNicknameThrowsExceptionInvalid(String newNickname) {
            // given
            Member member = memberRepository.save(MemberFixtures.FEMALE_30.get());

            // when, then
            assertThatThrownBy(() -> memberService.changeNickname(member, newNickname))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("닉네임에 들어갈 수 없는 문자가 포함되어 있습니다.");
        }

        @Test
        @DisplayName("이미 존재하는 회원의 닉네임과 같다면 예외가 발생한다.")
        void changeNicknameEqualToPrevious() {
            // given
            Member member1 = memberRepository.save(MemberFixtures.MALE_20.get());
            Member member2 = memberRepository.save(MemberFixtures.MALE_30.get());

            // when, then
            assertThatThrownBy(() -> memberService.changeNickname(member1, member2.getNickname()))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("이미 중복된 닉네임이 존재합니다.");
        }

    }

    @Nested
    @DisplayName("회원의 상세 정보를 수정할 때")
    class UpdateDetails {

        @Test
        @DisplayName("성별과 출생년도가 null이면 정상적으로 성공한다.")
        void updateDetailsSuccess() {
            // given
            Member unsavedMember = Member.builder()
                    .nickname("저문")
                    .socialType(SocialType.KAKAO)
                    .socialId("123123123")
                    .build();
            Member member = memberRepository.save(unsavedMember);
            MemberDetailRequest request = new MemberDetailRequest(Gender.FEMALE, 2000);

            // when
            memberService.updateDetails(request, member);

            // then
            assertAll(
                    () -> assertThat(member.getGender()).isEqualTo(Gender.FEMALE),
                    () -> assertThat(member.getBirthYear()).isEqualTo(2000)
            );
        }

        @Test
        @DisplayName("기존 성별이 지정되어 있으면 예외가 발생한다.")
        void updateDetailsSameGender() {
            // given
            Member unsavedMember = Member.builder()
                    .nickname("저문")
                    .gender(Gender.MALE)
                    .socialType(SocialType.KAKAO)
                    .socialId("123123123")
                    .build();
            Member member = memberRepository.save(unsavedMember);
            MemberDetailRequest request = new MemberDetailRequest(Gender.FEMALE, 2000);

            // when, then
            assertThatThrownBy(() -> memberService.updateDetails(request, member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("이미 성별이 할당되어 있습니다.");
        }

        @Test
        @DisplayName("기존 출생년도가 지정되어 있으면 예외가 발생한다.")
        void updateDetailsSameBirthYear() {
            // given
            Member unsavedMember = Member.builder()
                    .nickname("저문")
                    .birthYear(2000)
                    .socialType(SocialType.KAKAO)
                    .socialId("123123123")
                    .build();
            Member member = memberRepository.save(unsavedMember);
            MemberDetailRequest request = new MemberDetailRequest(Gender.MALE, 1995);

            // when, then
            assertThatThrownBy(() -> memberService.updateDetails(request, member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("이미 출생년도가 할당되어 있습니다.");
        }

    }

    @Test
    @DisplayName("회원 탈퇴를 성공한다.")
    void deleteMember() {
        // given
        Member member = memberRepository.save(MemberFixtures.MALE_20.get());

        // when
        memberService.deleteMember(member);

        // then
        assertThat(memberRepository.findAll()).isEmpty();
    }

}
