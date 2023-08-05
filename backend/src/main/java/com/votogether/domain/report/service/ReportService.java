package com.votogether.domain.report.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.exception.MemberExceptionType;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.domain.post.exception.CommentExceptionType;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.repository.CommentRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.report.dto.ReportRequest;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.entity.ReportType;
import com.votogether.domain.report.exception.ReportExceptionType;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.exception.BadRequestException;
import com.votogether.exception.NotFoundException;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void report(final Member reporter, final ReportRequest request) {
        final ReportType reportType = ReportType.valueOf(request.type());

        if (reportType == ReportType.POST) {
            reportPost(reporter, request, reportType);
        }
        if (reportType == ReportType.COMMENT) {
            reportComment(reporter, request, reportType);
        }
        if (reportType == ReportType.NICKNAME) {
            reportNickname(reporter, request, reportType);
        }
    }

    private void reportPost(
            final Member reporter,
            final ReportRequest request,
            final ReportType reportType
    ) {
        final Post reportedPost = postRepository.findById(request.id())
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_NOT_FOUND));
        validatePost(reporter, reportedPost, reportType, request.id());

        final Report report = Report.builder()
                .member(reporter)
                .reportType(reportType)
                .targetId(request.id())
                .build();
        reportRepository.save(report);
        blindPost(reportType, request.id(), reportedPost);
    }

    private void validatePost(
            final Member reporter,
            final Post reportedPost,
            final ReportType reportType,
            final Long targetId
    ) {
        reportedPost.validateMine(reporter);
        reportedPost.validateHidden();
        validateDuplicatedPostReport(reporter, reportType, targetId);
    }

    private void validateDuplicatedPostReport(
            final Member reporter,
            final ReportType reportType,
            final Long targetId
    ) {
        reportRepository.findByMemberAndReportTypeAndTargetId(reporter, reportType, targetId)
                .ifPresent(it -> {
                    throw new BadRequestException(ReportExceptionType.DUPLICATE_POST_REPORT);
                });
    }

    private void blindPost(
            final ReportType reportType,
            final Long targetId,
            final Post reportedPost
    ) {
        final int reportCount = reportRepository.countByReportTypeAndTargetId(reportType, targetId);
        reportedPost.blind(reportCount);
    }

    private void reportComment(
            final Member reporter,
            final ReportRequest request,
            final ReportType reportType
    ) {
        final Comment reportedComment = commentRepository.findById(request.id())
                .orElseThrow(() -> new NotFoundException(CommentExceptionType.COMMENT_NOT_FOUND));
        validateComment(reporter, request, reportType, reportedComment);

        final Report report = Report.builder()
                .member(reporter)
                .reportType(reportType)
                .targetId(request.id())
                .build();
        reportRepository.save(report);
        blindComment(request, reportType, reportedComment);
    }

    private void validateComment(
            final Member reporter,
            final ReportRequest request,
            final ReportType reportType,
            final Comment reportedComment
    ) {
        reportedComment.validateMine(reporter);
        reportedComment.validateHidden();
        validateDuplicatedCommentReport(reporter, request, reportType);
    }

    private void validateDuplicatedCommentReport(
            final Member reporter,
            final ReportRequest request,
            final ReportType reportType
    ) {
        reportRepository.findByMemberAndReportTypeAndTargetId(reporter, reportType, request.id())
                .ifPresent(it -> {
                    throw new BadRequestException(ReportExceptionType.DUPLICATE_COMMENT_REPORT);
                });
    }

    private void blindComment(
            final ReportRequest request,
            final ReportType reportType,
            final Comment reportedComment
    ) {
        final int reportCount = reportRepository.countByReportTypeAndTargetId(reportType, request.id());
        reportedComment.blind(reportCount);
    }

    private void reportNickname(
            final Member reporter,
            final ReportRequest request,
            final ReportType reportType
    ) {
        final Member reportedMember = memberRepository.findById(request.id())
                .orElseThrow(() -> new NotFoundException(MemberExceptionType.NONEXISTENT_MEMBER));
        validateNickname(reporter, request, reportType);

        final Report report = Report.builder()
                .member(reporter)
                .reportType(reportType)
                .targetId(reportedMember.getId())
                .build();
        reportRepository.save(report);
        changeNicknameByReport(reportedMember, reportType);
    }

    private void validateNickname(
            final Member reporter,
            final ReportRequest request,
            final ReportType reportType
    ) {
        validateMyNickname(reporter, request);
        validateDuplicatedNicknameReport(reporter, request, reportType);
    }

    private void validateMyNickname(final Member reporter, final ReportRequest request) {
        if (Objects.equals(reporter.getId(), request.id())) {
            throw new BadRequestException(ReportExceptionType.REPORT_MY_NICKNAME);
        }
    }

    private void validateDuplicatedNicknameReport(
            final Member reporter,
            final ReportRequest request,
            final ReportType reportType
    ) {
        reportRepository.findByMemberAndReportTypeAndTargetId(reporter, reportType, request.id())
                .ifPresent(it -> {
                    throw new BadRequestException(ReportExceptionType.DUPLICATE_NICKNAME_REPORT);
                });
    }

    private void changeNicknameByReport(final Member reportedMember, final ReportType reportType) {
        final int reportCount = reportRepository.countByReportTypeAndTargetId(reportType, reportedMember.getId());
        reportedMember.changeNicknameByReport(reportCount);
    }

}
