package com.votogether.domain.member.service;

import com.votogether.domain.member.dto.request.MemberDetailRequest;
import com.votogether.domain.member.dto.response.MemberInfoResponse;
import com.votogether.domain.member.dto.response.RankingResponse;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.MemberCategory;
import com.votogether.domain.member.entity.vo.EngagementRecord;
import com.votogether.domain.member.entity.vo.Nickname;
import com.votogether.domain.member.exception.MemberExceptionType;
import com.votogether.domain.member.repository.MemberCategoryRepository;
import com.votogether.domain.member.repository.MemberRepository;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberCategoryRepository memberCategoryRepository;
    private final PostRepository postRepository;
    private final VoteRepository voteRepository;
    private final ReportRepository reportRepository;
    private final CommentRepository commentRepository;

    @Transactional
    public Member register(final Member member) {
        final Optional<Member> maybeMember = memberRepository.findBySocialIdAndSocialType(
                member.getSocialId(),
                member.getSocialType()
        );
        return maybeMember.orElseGet(() -> memberRepository.save(member));
    }

    @Transactional(readOnly = true)
    public Member findById(final Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(MemberExceptionType.NONEXISTENT_MEMBER));
    }

    @Transactional(readOnly = true)
    public MemberInfoResponse findMemberInfo(final Member member) {
        final int numberOfPosts = postRepository.countByWriter(member);
        final int numberOfVotes = voteRepository.countByMember(member);

        return new MemberInfoResponse(
                member.getNickname(),
                member.getGender(),
                member.getBirthYear(),
                numberOfPosts,
                numberOfVotes
        );
    }

    public RankingResponse getRanking(final Member member) {
        RankingBoard rankingBoard = rankingBoard();
        return new RankingResponse(
                rankingBoard.ranking(member),
                member.getNickname(),
                rankingBoard.engagementRecord(member).getPostCount(),
                rankingBoard.engagementRecord(member).getVoteCount(),
                rankingBoard.score(member)
        );
    }

    @Transactional
    public void changeNickname(final Member member, final String nickname) {
        validateExistentNickname(nickname);
        member.changeNickname(nickname);
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
    public void deleteMember(final Member member) {
        final List<Post> posts = deletePosts(member);
        final List<Comment> comments = deleteComments(member);
        deleteVotes(member);
        deleteMemberCategories(member);
        deleteReports(member, posts, comments);

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
        final List<Comment> comments = commentRepository.findAllByMember(member);
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

    private RankingBoard rankingBoard() {
        List<Member> members = memberRepository.findAll();
        List<Integer> postCounts = postRepository.findCountsByMembers(members);
        List<Integer> voteCounts = voteRepository.findCountsByMembers(members);

        Map<Member, EngagementRecord> passionBoard = new HashMap<>();

        for (int i = 0; i < members.size(); i++) {
            passionBoard.put(members.get(i), new EngagementRecord(postCounts.get(i), voteCounts.get(i)));
        }

        return new RankingBoard(passionBoard);
    }
}
