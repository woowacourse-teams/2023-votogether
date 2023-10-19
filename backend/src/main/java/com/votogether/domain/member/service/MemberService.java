package com.votogether.domain.member.service;

import com.votogether.domain.alarm.entity.Alarm;
import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.repository.AlarmRepository;
import com.votogether.domain.alarm.repository.ReportActionAlarmRepository;
import com.votogether.domain.member.dto.request.MemberDetailRequest;
import com.votogether.domain.member.dto.response.MemberInfoResponse;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.MemberCategory;
import com.votogether.domain.member.entity.MemberMetric;
import com.votogether.domain.member.entity.vo.Nickname;
import com.votogether.domain.member.exception.MemberExceptionType;
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
import com.votogether.domain.vote.entity.Vote;
import com.votogether.domain.vote.repository.VoteRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MemberService {

    private static final Long NICKNAME_CHANGING_CYCLE = 14L;

    private final MemberRepository memberRepository;
    private final MemberMetricRepository memberMetricRepository;
    private final MemberCategoryRepository memberCategoryRepository;
    private final PostRepository postRepository;
    private final VoteRepository voteRepository;
    private final ReportRepository reportRepository;
    private final CommentRepository commentRepository;
    private final AlarmRepository alarmRepository;
    private final ReportActionAlarmRepository reportActionAlarmRepository;
    private final NoticeRepository noticeRepository;

    @Transactional
    public Member register(final Member member) {
        final Optional<Member> maybeMember = memberRepository.findBySocialIdAndSocialType(
                member.getSocialId(),
                member.getSocialType()
        );
        return maybeMember.orElseGet(() -> {
            final Member savedMember = memberRepository.save(member);
            final MemberMetric memberMetric = MemberMetric.builder()
                    .member(member)
                    .postCount(0)
                    .voteCount(0)
                    .score(0)
                    .build();
            memberMetricRepository.save(memberMetric);
            return savedMember;
        });
    }

    @Transactional(readOnly = true)
    public Member findById(final Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(MemberExceptionType.NON_EXISTENT_MEMBER));
    }

    @Transactional(readOnly = true)
    public MemberInfoResponse findMemberInfo(final Member member) {
        final MemberMetric memberMetric = memberMetricRepository.findByMember(member)
                .orElseThrow(() -> new NotFoundException(MemberExceptionType.NOT_FOUND_METRIC));
        final boolean hasLatestAlarm = hasLatestAlarm(member);

        return new MemberInfoResponse(
                member.getNickname(),
                member.getGender(),
                member.getBirthYear(),
                memberMetric.getPostCount(),
                memberMetric.getVoteCount(),
                member.getRoles(),
                hasLatestAlarm
        );
    }

    private boolean hasLatestAlarm(final Member member) {
        final Optional<Alarm> maybeAlarm = alarmRepository.findTopByMemberOrderByIdDesc(member);
        final Optional<ReportActionAlarm> maybeReportActionAlarm =
                reportActionAlarmRepository.findTopByMemberOrderByIdDesc(member);
        final List<Optional<LocalDateTime>> maybeCreatedAts = List.of(
                maybeAlarm.map(Alarm::getCreatedAt),
                maybeReportActionAlarm.map(ReportActionAlarm::getCreatedAt)
        );

        return getLatestAlarmCreatedAt(maybeCreatedAts, member);
    }

    private boolean getLatestAlarmCreatedAt(
            final List<Optional<LocalDateTime>> maybeCreatedAts,
            final Member member
    ) {
        return maybeCreatedAts.stream()
                .filter(Optional::isPresent)
                .map(Optional::get)
                .anyMatch(member::hasLatestAlarmCompareTo);
    }

    @Transactional
    public void changeNickname(final Member member, final String nickname) {
        validateExistentNickname(nickname);
        member.changeNicknameByCycle(nickname, NICKNAME_CHANGING_CYCLE);
    }

    private void validateExistentNickname(final String nickname) {
        final boolean isExist = memberRepository.existsByNickname(new Nickname(nickname));
        if (isExist) {
            throw new BadRequestException(MemberExceptionType.ALREADY_EXISTENT_NICKNAME);
        }
    }

    @Transactional
    public void updateDetails(final MemberDetailRequest request, final Member member) {
        validateExistentDetails(member);
        member.updateDetails(request.gender(), request.birthYear());
    }

    private void validateExistentDetails(final Member member) {
        if (member.getGender() != null) {
            throw new BadRequestException(MemberExceptionType.ALREADY_ASSIGNED_GENDER);
        }
        if (member.getBirthYear() != null) {
            throw new BadRequestException(MemberExceptionType.ALREADY_ASSIGNED_BIRTH_YEAR);
        }
    }

    @Transactional
    public void checkLatestAlarm(final Member member) {
        member.checkAlarm();
    }

    @Transactional
    public void deleteMember(final Member member) {
        final List<Post> posts = deletePosts(member);
        final List<Comment> comments = deleteComments(member);
        deleteVotes(member);
        deleteMemberCategories(member);
        deleteReports(member, posts, comments);
        deleteAlarms(member);
        deleteReportActionAlarms(member);
        deleteNotices(member);

        memberMetricRepository.deleteByMember(member);
        memberRepository.delete(member);
    }

    private List<Post> deletePosts(final Member member) {
        final List<Post> posts = postRepository.findAllByWriter(member);
        final List<Long> postIds = posts.stream()
                .map(Post::getId)
                .toList();
        postRepository.deleteAllById(postIds);
        return posts;
    }

    private List<Comment> deleteComments(final Member member) {
        final List<Comment> comments = commentRepository.findAllByWriter(member);
        final List<Long> commentIds = comments.stream()
                .map(Comment::getId)
                .toList();
        commentRepository.deleteAllById(commentIds);
        return comments;
    }

    private void deleteVotes(final Member member) {
        final List<Long> voteIds = voteRepository.findAllByMember(member)
                .stream()
                .map(Vote::getId)
                .toList();
        voteRepository.deleteAllById(voteIds);
    }

    private void deleteMemberCategories(final Member member) {
        final List<Long> memberCategoryIds = memberCategoryRepository.findAllByMember(member)
                .stream()
                .map(MemberCategory::getId)
                .toList();
        memberCategoryRepository.deleteAllById(memberCategoryIds);
    }

    private void deleteReports(
            final Member member,
            final List<Post> posts,
            final List<Comment> comments
    ) {
        deleteReportByPost(posts);
        deleteReportByComment(comments);
        deleteReportByNickname(member);
        deleteReportByMember(member);
    }

    private void deleteReportByPost(final List<Post> posts) {
        for (final Post post : posts) {
            final List<Long> reportIds = reportRepository.findAllByReportTypeAndTargetId(ReportType.POST, post.getId())
                    .stream()
                    .map(Report::getId)
                    .toList();
            reportRepository.deleteAllById(reportIds);
        }
    }

    private void deleteReportByComment(final List<Comment> comments) {
        for (final Comment comment : comments) {
            final List<Long> reportIds =
                    reportRepository.findAllByReportTypeAndTargetId(ReportType.COMMENT, comment.getId())
                            .stream()
                            .map(Report::getId)
                            .toList();
            reportRepository.deleteAllById(reportIds);
        }
    }

    private void deleteReportByNickname(final Member member) {
        final List<Long> reportIdsByTargetId =
                reportRepository.findAllByReportTypeAndTargetId(ReportType.NICKNAME, member.getId())
                        .stream()
                        .map(Report::getId)
                        .toList();
        reportRepository.deleteAllById(reportIdsByTargetId);
    }

    private void deleteReportByMember(final Member member) {
        final List<Long> reportIdsByMember = reportRepository.findAllByMember(member)
                .stream()
                .map(Report::getId)
                .toList();
        reportRepository.deleteAllById(reportIdsByMember);
    }

    private void deleteAlarms(final Member member) {
        final List<Long> alarmIds = alarmRepository.findAllByMember(member)
                .stream()
                .map(Alarm::getId)
                .toList();
        alarmRepository.deleteAllById(alarmIds);
    }

    private void deleteReportActionAlarms(final Member member) {
        final List<Long> reportActionAlarmIds = reportActionAlarmRepository.findAllByMember(member)
                .stream()
                .map(ReportActionAlarm::getId)
                .toList();
        reportActionAlarmRepository.deleteAllById(reportActionAlarmIds);
    }

    private void deleteNotices(final Member member) {
        final List<Long> noticeIds = noticeRepository.findAllByMember(member)
                .stream()
                .map(Notice::getId)
                .toList();
        noticeRepository.deleteAllById(noticeIds);
    }

}
