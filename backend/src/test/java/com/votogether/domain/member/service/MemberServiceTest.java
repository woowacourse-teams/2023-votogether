package com.votogether.domain.member.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.ServiceTest;
import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.dto.MemberDetailRequest;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.MemberCategory;
import com.votogether.domain.member.entity.SocialType;
import com.votogether.domain.member.repository.MemberCategoryRepository;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.domain.post.repository.CommentRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.entity.ReportType;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.exception.BadRequestException;
import com.votogether.fixtures.MemberFixtures;
import com.votogether.test.persister.MemberTestPersister;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
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
    PostRepository postRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    MemberCategoryRepository memberCategoryRepository;

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    CommentRepository commentRepository;

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

    @Nested
    @DisplayName("회원 탈퇴를 할 때")
    class DeleteMember {

        @Test
        @DisplayName("회원만 존재하는 경우 정상적으로 성공한다.")
        void success() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());

            // when
            memberService.deleteMember(member);

            // then
            assertThat(memberRepository.findAll()).isEmpty();
        }

        @Test
        @DisplayName("회원과 게시글이 존재하는 경우 정상적으로 성공한다.")
        void successWithPost() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());

            PostBody postBody = PostBody.builder()
                    .title("title")
                    .content("content")
                    .build();

            Post post = Post.builder()
                    .writer(member)
                    .postBody(postBody)
                    .deadline(LocalDateTime.now().plusDays(3L).truncatedTo(ChronoUnit.MINUTES))
                    .build();

            postRepository.save(post);

            // when
            memberService.deleteMember(member);

            // then
            assertAll(
                    () -> assertThat(memberRepository.findAll()).isEmpty(),
                    () -> assertThat(postRepository.findAll()).isEmpty()
            );
        }

        @Test
        @DisplayName("회원과 타인의 게시글이 존재하는 경우 회원만 탈퇴된다.")
        void deleteOnlyMember() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());
            Member writer = memberRepository.save(MemberFixtures.FEMALE_20.get());

            PostBody postBody = PostBody.builder()
                    .title("title")
                    .content("content")
                    .build();

            Post post = Post.builder()
                    .writer(writer)
                    .postBody(postBody)
                    .deadline(LocalDateTime.now().plusDays(3L).truncatedTo(ChronoUnit.MINUTES))
                    .build();

            postRepository.save(post);

            // when
            memberService.deleteMember(member);

            // then
            assertAll(
                    () -> assertThat(memberRepository.findAll()).hasSize(1),
                    () -> assertThat(memberRepository.findById(writer.getId()).get()).isEqualTo(writer),
                    () -> assertThat(postRepository.findAll()).hasSize(1)
            );
        }

        @Test
        @DisplayName("회원과 회원의 즐겨찾는 카테고리가 존재하는 경우 모두 삭제된다.")
        void deleteWithMemberCategory() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());

            Category category1 = Category.builder().name("음악").build();
            Category category2 = Category.builder().name("개발").build();
            Category category3 = Category.builder().name("연애").build();

            categoryRepository.saveAll(List.of(category1, category2, category3));

            MemberCategory memberCategory = MemberCategory.builder()
                    .member(member)
                    .category(category1)
                    .build();

            memberCategoryRepository.save(memberCategory);

            // when
            memberService.deleteMember(member);

            // then
            assertAll(
                    () -> assertThat(memberRepository.findAll()).isEmpty(),
                    () -> assertThat(categoryRepository.findAll()).hasSize(3),
                    () -> assertThat(memberCategoryRepository.findAll()).isEmpty()
            );
        }

        @Test
        @DisplayName("회원과 회원의 신고가 존재하는 경우 모두 삭제된다.")
        void deleteWithReportByOthers() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());

            Report report = Report.builder()
                    .member(member)
                    .reportType(ReportType.POST)
                    .targetId(1L)
                    .reason("불건전한 게시글")
                    .build();
            reportRepository.save(report);

            // when
            memberService.deleteMember(member);

            // then
            assertAll(
                    () -> assertThat(memberRepository.findAll()).isEmpty(),
                    () -> assertThat(reportRepository.findAll()).isEmpty()
            );
        }

        @Test
        @DisplayName("회원과 신고당한 회원의 게시글 기록 모두 삭제된다.")
        void deleteWithReportedPost() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());
            Member reporter = memberRepository.save(MemberFixtures.MALE_10.get());

            PostBody postBody = PostBody.builder()
                    .title("title")
                    .content("content")
                    .build();

            Post post = Post.builder()
                    .writer(member)
                    .postBody(postBody)
                    .deadline(LocalDateTime.now().plusDays(3L).truncatedTo(ChronoUnit.MINUTES))
                    .build();

            postRepository.save(post);

            Report report = Report.builder()
                    .member(reporter)
                    .reportType(ReportType.POST)
                    .targetId(post.getId())
                    .reason("불건전한 게시글")
                    .build();
            reportRepository.save(report);

            // when
            memberService.deleteMember(member);

            // then
            assertAll(
                    () -> assertThat(memberRepository.findAll()).hasSize(1),
                    () -> assertThat(postRepository.findAll()).isEmpty(),
                    () -> assertThat(reportRepository.findAll()).isEmpty()
            );
        }

        @Test
        @DisplayName("회원과 신고당한 회원의 댓글 기록 모두 삭제된다.")
        void deleteWithReportedComment() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());
            Member reporter = memberRepository.save(MemberFixtures.MALE_10.get());

            PostBody postBody = PostBody.builder()
                    .title("title")
                    .content("content")
                    .build();

            Post post = Post.builder()
                    .writer(reporter)
                    .postBody(postBody)
                    .deadline(LocalDateTime.now().plusDays(3L).truncatedTo(ChronoUnit.MINUTES))
                    .build();

            Comment comment = Comment.builder()
                    .post(post)
                    .member(member)
                    .content("댓글입니다.")
                    .build();

            post.addComment(comment);

            postRepository.save(post);

            Report report = Report.builder()
                    .member(reporter)
                    .reportType(ReportType.COMMENT)
                    .targetId(comment.getId())
                    .reason("불건전한 댓글")
                    .build();
            reportRepository.save(report);

            // when
            memberService.deleteMember(member);

            // then
            assertAll(
                    () -> assertThat(memberRepository.findAll()).hasSize(1),
                    () -> assertThat(commentRepository.findAll()).isEmpty(),
                    () -> assertThat(reportRepository.findAll()).isEmpty()
            );
        }

        @Test
        @DisplayName("회원과 신고당한 닉네임 기록 모두 삭제된다.")
        void deleteWithReportedNickname() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());
            Member reporter = memberRepository.save(MemberFixtures.MALE_10.get());

            Report report = Report.builder()
                    .member(reporter)
                    .reportType(ReportType.NICKNAME)
                    .targetId(member.getId())
                    .reason("불건전한 닉네임")
                    .build();
            reportRepository.save(report);

            // when
            memberService.deleteMember(member);

            // then
            assertAll(
                    () -> assertThat(memberRepository.findAll()).hasSize(1),
                    () -> assertThat(reportRepository.findAll()).isEmpty()
            );
        }

    }

}
