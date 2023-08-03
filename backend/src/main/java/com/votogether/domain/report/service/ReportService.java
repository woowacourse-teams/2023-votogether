package com.votogether.domain.report.service;

import com.votogether.domain.member.entity.Member;
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
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    @Transactional
    public void report(final Member member, final ReportRequest request) {
        final ReportType reportType = ReportType.valueOf(request.type());

        if (reportType == ReportType.POST) {
            reportPost(member, request, reportType);
        }
        if (reportType == ReportType.COMMENT) {
            reportComment(member, request, reportType);
        }
        if (reportType == ReportType.NICKNAME) {

        }
    }

    private void reportPost(
            final Member member,
            final ReportRequest request,
            final ReportType reportType
    ) {
        final Post reportedPost = postRepository.findById(request.id())
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_NOT_FOUND));
        validatePost(member, reportedPost, reportType, request.id());

        final Report report = Report.builder()
                .member(member)
                .reportType(reportType)
                .targetId(request.id())
                .build();
        reportRepository.save(report);
        blindPost(reportType, request.id(), reportedPost);
    }

    private void reportComment(
            final Member member,
            final ReportRequest request,
            final ReportType reportType
    ) {
        final Comment reportedComment = commentRepository.findById(request.id())
                .orElseThrow(() -> new NotFoundException(CommentExceptionType.COMMENT_NOT_FOUND));
        validateComment(member, request, reportType, reportedComment);

        final Report report = Report.builder()
                .member(member)
                .reportType(reportType)
                .targetId(request.id())
                .build();
        reportRepository.save(report);
        blindComment(request, reportType, reportedComment);
    }

    private void validatePost(
            final Member member,
            final Post reportedPost,
            final ReportType reportType,
            final Long targetId
    ) {
        validateMine(member, reportedPost);
        validateHidden(reportedPost);
        validateDuplicatedReport(member, reportType, targetId);
    }

    private void validateMine(final Member member, final Post reportedPost) {
        postRepository.findAllByWriter(member)
                .stream()
                .filter(reporterPost -> reporterPost.equals(reportedPost))
                .findAny()
                .ifPresent(post -> {
                    throw new BadRequestException(ReportExceptionType.REPORT_MY_POST);
                });
    }

    private void validateHidden(final Post reportedPost) {
        if (reportedPost.isHidden()) {
            throw new BadRequestException(ReportExceptionType.ALREADY_HIDDEN_POST);
        }
    }

    private void validateDuplicatedReport(
            final Member member,
            final ReportType reportType,
            final Long targetId
    ) {
        reportRepository.findByMemberAndReportTypeAndTargetId(member, reportType, targetId)
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

    private void validateComment(
            final Member member,
            final ReportRequest request,
            final ReportType reportType,
            final Comment reportedComment
    ) {
        if (reportedComment.getMember().equals(member)) {
            throw new BadRequestException(ReportExceptionType.REPORT_MY_COMMENT);
        }
        if (reportedComment.isHidden()) {
            throw new BadRequestException(ReportExceptionType.ALREADY_HIDDEN_COMMENT);
        }
        reportRepository.findByMemberAndReportTypeAndTargetId(member, reportType, request.id())
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

}
