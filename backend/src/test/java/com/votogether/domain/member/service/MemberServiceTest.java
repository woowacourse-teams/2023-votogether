package com.votogether.domain.member.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.votogether.domain.alarm.entity.Alarm;
import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.repository.ReportActionAlarmRepository;
import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.dto.request.MemberDetailRequest;
import com.votogether.domain.member.dto.response.MemberInfoResponse;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.MemberCategory;
import com.votogether.domain.member.entity.vo.Gender;
import com.votogether.domain.member.entity.vo.Roles;
import com.votogether.domain.member.entity.vo.SocialType;
import com.votogether.domain.member.repository.MemberCategoryRepository;
import com.votogether.domain.member.repository.MemberMetricRepository;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.notice.entity.Notice;
import com.votogether.domain.notice.repository.NoticeRepository;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.domain.post.repository.CommentRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import com.votogether.test.ServiceTest;
import com.votogether.test.fixtures.MemberFixtures;
import com.votogether.test.persister.AlarmTestPersister;
import com.votogether.test.persister.PostTestPersister;
import com.votogether.test.persister.ReportActionAlarmTestPersister;
import jakarta.persistence.EntityManager;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.util.ReflectionTestUtils;

class MemberServiceTest extends ServiceTest {

    @Autowired
    MemberService memberService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberMetricRepository memberMetricRepository;

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
    PostTestPersister postTestPersister;

    @Autowired
    AlarmTestPersister alarmTestPersister;

    @Autowired
    ReportActionAlarmTestPersister reportActionAlarmTestPersister;

    @Autowired
    ReportActionAlarmRepository reportActionAlarmRepository;

    @Autowired
    NoticeRepository noticeRepository;

    @Autowired
    EntityManager em;

    @Test
    @DisplayName("멤버가 존재하지 않으면 저장한다.")
    void register() {
        // given
        Member member = MemberFixtures.FEMALE_20.get();

        // when
        Member registeredMember = memberService.register(member);

        // then
        assertSoftly(softly -> {
            softly.assertThat(registeredMember.getId()).isNotNull();
            softly.assertThat(memberMetricRepository.findByMember(member)).isPresent();
        });
    }

    @Nested
    @DisplayName("변경할 회원의 닉네임이")
    class ChangeNickname {

        @Test
        @DisplayName("한번도 변경되지 않았다면 닉네임 변경 주기에 상관없이 닉네임을 변경한다.")
        void changeNickname() {
            // given
            Member member = Member.builder()
                    .nickname("익명의손님fFp4vAgX2d")
                    .gender(Gender.MALE)
                    .birthYear(1966)
                    .socialId("abc123")
                    .socialType(SocialType.KAKAO)
                    .roles(Roles.MEMBER)
                    .alarmCheckedAt(LocalDateTime.now())
                    .build();
            String newNickname = "jeomxon";
            Member savedMember = memberRepository.save(member);

            // when
            memberService.changeNickname(savedMember, newNickname);

            // then
            assertThat(savedMember.getNickname()).isEqualTo(newNickname);
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

        @Test
        @DisplayName("최초 닉네임을 변경한 후 닉네임 변경 주기가 지나지 않았다면 예외가 발생한다.")
        void changeNicknameThrowsExceptionNotPassedChangingCycle() {
            // given
            Member member = Member.builder()
                    .nickname("익명의손님fFp4vAgX2d")
                    .gender(Gender.MALE)
                    .birthYear(1966)
                    .socialId("abc123")
                    .socialType(SocialType.KAKAO)
                    .roles(Roles.MEMBER)
                    .alarmCheckedAt(LocalDateTime.now())
                    .build();
            Member savedMember = memberRepository.save(member);

            memberService.changeNickname(savedMember, "저문");

            // when, then
            assertThatThrownBy(() -> memberService.changeNickname(savedMember, "저라니"))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("최소 닉네임 변경주기가 지나지 않았습니다.");
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
                    .roles(Roles.MEMBER)
                    .alarmCheckedAt(LocalDateTime.now())
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
            Member member = memberRepository.save(MemberFixtures.MALE_30.get());
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
                    .birthYear(1993)
                    .socialType(SocialType.KAKAO)
                    .socialId("123123123")
                    .roles(Roles.MEMBER)
                    .alarmCheckedAt(LocalDateTime.now())
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
    @DisplayName("내 정보 조회를 할 때")
    class FindMemberInfo {

        @Test
        @DisplayName("정상적으로 조회가 된다.")
        void success() {
            // given
            Member member = memberTestPersister.builder().save();
            memberMetricTestPersister.builder().member(member).save();

            // when
            MemberInfoResponse memberInfoResponse = memberService.findMemberInfo(member);

            // then
            assertSoftly(softly -> {
                softly.assertThat(memberInfoResponse.gender()).isEqualTo(Gender.MALE);
                softly.assertThat(memberInfoResponse.birthYear()).isEqualTo(1995);
                softly.assertThat(memberInfoResponse.postCount()).isZero();
                softly.assertThat(memberInfoResponse.voteCount()).isZero();
                softly.assertThat(memberInfoResponse.hasLatestAlarm()).isFalse();
            });
        }

        @Test
        @DisplayName("메트릭 정보가 없는 경우 예외가 발생한다.")
        void throwsExceptionWhenNoMetrics() {
            // given
            Member member = memberTestPersister.builder().save();

            // when, then
            assertThatThrownBy(() -> memberService.findMemberInfo(member))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("메트릭 정보가 존재하지 않습니다.");
        }

        @Test
        @DisplayName("모든 알림이 존재하지 않는 경우 false가 반환된다.")
        void returnsFalseWhenNoAlarmExists() {
            // given
            Member member = memberTestPersister.builder().save();
            memberMetricTestPersister.builder().member(member).save();

            // when
            MemberInfoResponse memberInfoResponse = memberService.findMemberInfo(member);

            // then
            assertThat(memberInfoResponse.hasLatestAlarm()).isFalse();
        }

        @Test
        @DisplayName("게시글 내역 알림이 존재한다면 회원의 최신 알림 확인 시각과 비교하여 게시글 알림이 더 최신인 경우 true를 반환한다.")
        void returnsTrueWhenPostAlarmIsLatest() {
            // given
            Member member = memberTestPersister.builder().save();
            memberMetricTestPersister.builder().member(member).save();
            alarmTestPersister.builder().member(member).save();

            // when
            MemberInfoResponse memberInfoResponse = memberService.findMemberInfo(member);

            // then
            assertThat(memberInfoResponse.hasLatestAlarm()).isTrue();
        }

        @Test
        @DisplayName("신고 조치 내역 알림이 존재한다면 회원의 최신 알림 확인 시각과 비교하여 신고 조치 내역 알림이 더 최신인 경우 true를 반환한다.")
        void returnsTrueWhenReportActionAlarmIsLatest() {
            // given
            Member member = memberTestPersister.builder().save();
            memberMetricTestPersister.builder().member(member).save();
            reportActionAlarmTestPersister.builder().member(member).save();

            // when
            MemberInfoResponse memberInfoResponse = memberService.findMemberInfo(member);

            // then
            assertThat(memberInfoResponse.hasLatestAlarm()).isTrue();
        }

        @Test
        @DisplayName("신고 조치 내역 알림과 게시글 내역 알림이 모두 존재한다면 회원의 최신 알림 확인 시각과 비교하여 알림들이 더 최신인 경우 true를 반환한다.")
        void returnsTrueWhenReportActionAlarmOrPostAlarmIsLatest() {
            // given
            Member member = memberTestPersister.builder().save();
            memberMetricTestPersister.builder().member(member).save();
            alarmTestPersister.builder().member(member).save();
            reportActionAlarmTestPersister.builder().member(member).save();

            // when
            MemberInfoResponse memberInfoResponse = memberService.findMemberInfo(member);

            // then
            assertThat(memberInfoResponse.hasLatestAlarm()).isTrue();
        }

        @Test
        @DisplayName("게시글 내역 알림과 신고 조치 내역 알림 모두 존재하고, 게시글 내역 알림이 가장 최신인 경우 true를 반환한다.")
        void returnsTrueWhenPostAlarmIsLatestAndReportActionAlarmIsNotLatest() {
            // given
            Member member = memberTestPersister.builder().save();
            memberMetricTestPersister.builder().member(member).save();
            Alarm alarm = alarmTestPersister.builder().member(member).save();
            ReportActionAlarm reportActionAlarm = reportActionAlarmTestPersister.builder().member(member).save();

            ReflectionTestUtils.setField(member, "alarmCheckedAt", LocalDateTime.now().minusDays(1));
            ReflectionTestUtils.setField(alarm, "createdAt", LocalDateTime.now());
            ReflectionTestUtils.setField(reportActionAlarm, "createdAt", LocalDateTime.now().minusDays(1));

            // when
            MemberInfoResponse memberInfoResponse = memberService.findMemberInfo(member);

            // then
            assertThat(memberInfoResponse.hasLatestAlarm()).isTrue();
        }

        @Test
        @DisplayName("게시글 내역 알림과 신고 조치 내역 알림 모두 존재하고, 신고 조치 내역 알림이 가장 최신인 경우 true를 반환한다.")
        void returnsTrueWhenPostAlarmIsNotLatestAndReportActionAlarmIsLatest() {
            // given
            Member member = memberTestPersister.builder().save();
            memberMetricTestPersister.builder().member(member).save();
            Alarm alarm = alarmTestPersister.builder().member(member).save();
            ReportActionAlarm reportActionAlarm = reportActionAlarmTestPersister.builder().member(member).save();

            ReflectionTestUtils.setField(member, "alarmCheckedAt", LocalDateTime.now().minusDays(1));
            ReflectionTestUtils.setField(alarm, "createdAt", LocalDateTime.now().minusDays(1));
            ReflectionTestUtils.setField(reportActionAlarm, "createdAt", LocalDateTime.now());

            // when
            MemberInfoResponse memberInfoResponse = memberService.findMemberInfo(member);

            // then
            assertThat(memberInfoResponse.hasLatestAlarm()).isTrue();
        }

        @Test
        @DisplayName("신고 조치 내역 알림이 존재하지만, 회원의 최신 알림 확인 시각이 더 최신인 경우 false를 반환한다.")
        void returnsFalseWhenReportActionAlarmOrPostAlarmIsNotLatest() {
            // given
            Member member = memberTestPersister.builder().save();
            memberMetricTestPersister.builder().member(member).save();
            Alarm alarm = alarmTestPersister.builder().member(member).save();
            ReportActionAlarm reportActionAlarm = reportActionAlarmTestPersister.builder().member(member).save();

            ReflectionTestUtils.setField(alarm, "createdAt", LocalDateTime.now().minusDays(1));
            ReflectionTestUtils.setField(reportActionAlarm, "createdAt", LocalDateTime.now().minusDays(1));

            // when
            MemberInfoResponse memberInfoResponse = memberService.findMemberInfo(member);

            // then
            assertThat(memberInfoResponse.hasLatestAlarm()).isFalse();
        }

    }

    @Test
    @DisplayName("최신 알림을 확인한다.")
    void checkLatestAlarm() {
        // given
        Member member = memberTestPersister.builder().save();
        LocalDateTime beforeTime = member.getCreatedAt();

        // when
        memberService.checkLatestAlarm(member);

        // then
        assertThat(member.getAlarmCheckedAt()).isNotEqualTo(beforeTime);
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
        @DisplayName("멤버 통계 정보도 함께 삭제한다.")
        void deleteWithMetric() {
            // given
            Member member = MemberFixtures.FEMALE_20.get();
            Member registeredMember = memberService.register(member);

            // when
            memberService.deleteMember(registeredMember);

            // then
            assertThat(memberMetricRepository.findAll()).isEmpty();
        }

        @Test
        @DisplayName("회원과 게시글이 존재하는 경우 정상적으로 성공한다.")
        void successWithPost() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());

            Post post = Post.builder()
                    .writer(member)
                    .title("title")
                    .content("content")
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

            Post post = Post.builder()
                    .writer(writer)
                    .title("title")
                    .content("content")
                    .deadline(LocalDateTime.now().plusDays(3L).truncatedTo(ChronoUnit.MINUTES))
                    .build();

            postRepository.save(post);

            // when
            memberService.deleteMember(member);

            // then
            assertAll(
                    () -> assertThat(memberRepository.findAll()).hasSize(1),
                    () -> assertThat(memberRepository.findById(writer.getId())).contains(writer),
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

            Post post = Post.builder()
                    .writer(member)
                    .title("title")
                    .content("content")
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

            Post post = Post.builder()
                    .writer(reporter)
                    .title("title")
                    .content("content")
                    .deadline(LocalDateTime.now().plusDays(3L).truncatedTo(ChronoUnit.MINUTES))
                    .build();

            Comment comment = Comment.builder()
                    .post(post)
                    .writer(member)
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

            em.flush();
            em.clear();

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

        @Test
        @DisplayName("회원과 신고조치알림 모두 삭제된다.")
        void deleteWithReportActionAlarms() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());

            ReportActionAlarm reportActionAlarm = ReportActionAlarm.builder()
                    .reportType(ReportType.POST)
                    .member(member)
                    .isChecked(false)
                    .target("1")
                    .reasons("광고성, 부적합성")
                    .build();
            reportActionAlarmRepository.save(reportActionAlarm);

            // when
            memberService.deleteMember(member);

            // then
            assertAll(
                    () -> assertThat(memberRepository.findAll()).isEmpty(),
                    () -> assertThat(reportActionAlarmRepository.findAll()).isEmpty()
            );
        }

        @Test
        @DisplayName("회원과 작성한 공지사항 모두 삭제된다.")
        void deleteWithNotices() {
            // given
            Member member = memberRepository.save(MemberFixtures.MALE_20.get());

            Notice notice = Notice.builder()
                    .member(member)
                    .title("title")
                    .content("content")
                    .deadline(LocalDateTime.now().plusDays(1))
                    .build();
            noticeRepository.save(notice);

            // when
            memberService.deleteMember(member);

            // then
            assertAll(
                    () -> assertThat(memberRepository.findAll()).isEmpty(),
                    () -> assertThat(noticeRepository.findAll()).isEmpty()
            );
        }

    }

}
