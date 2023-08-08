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
        if (request.type() == ReportType.POST) {
            reportPost(reporter, request);
        }
        if (request.type() == ReportType.COMMENT) {
            reportComment(reporter, request);
        }
        if (request.type() == ReportType.NICKNAME) {
            reportNickname(reporter, request);
        }
    }

    private void reportPost(
            final Member reporter,
            final ReportRequest request
    ) {
        final Post reportedPost = postRepository.findById(request.id())
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_NOT_FOUND));
        validatePost(reporter, reportedPost, request);

        saveReport(reporter, request);
        blindPost(request, reportedPost);
    }

    private void validatePost(
            final Member reporter,
            final Post reportedPost,
            final ReportRequest request
    ) {
        reportedPost.validateMine(reporter);
        reportedPost.validateHidden();
        validateDuplicatedReport(reporter, request, ReportExceptionType.DUPLICATE_POST_REPORT);
    }

    private void validateDuplicatedReport(
            final Member reporter,
            final ReportRequest request,
            final ReportExceptionType exceptionType
    ) {
        reportRepository.findByMemberAndReportTypeAndTargetId(reporter, request.type(), request.id())
                .ifPresent(report -> {
                    throw new BadRequestException(exceptionType);
                });
    }

    private void saveReport(final Member reporter, final ReportRequest request) {
        final Report report = Report.builder()
                .member(reporter)
                .reportType(request.type())
                .targetId(request.id())
                .reason(request.reason())
                .build();
        reportRepository.save(report);
    }

    private void blindPost(
            final ReportRequest request,
            final Post reportedPost
    ) {
        final int reportCount = reportRepository.countByReportTypeAndTargetId(request.type(), request.id());
        if (reportCount >= 5) {
            reportedPost.blind();
        }
    }

    private void reportComment(
            final Member reporter,
            final ReportRequest request
    ) {
        final Comment reportedComment = commentRepository.findById(request.id())
                .orElseThrow(() -> new NotFoundException(CommentExceptionType.COMMENT_NOT_FOUND));
        validateComment(reporter, request, reportedComment);

        saveReport(reporter, request);
        blindComment(request, reportedComment);
    }

    private void validateComment(
            final Member reporter,
            final ReportRequest request,
            final Comment reportedComment
    ) {
        reportedComment.validateMine(reporter);
        reportedComment.validateHidden();
        validateDuplicatedReport(reporter, request, ReportExceptionType.DUPLICATE_COMMENT_REPORT);
    }

    private void blindComment(
            final ReportRequest request,
            final Comment reportedComment
    ) {
        final int reportCount = reportRepository.countByReportTypeAndTargetId(request.type(), request.id());
        if (reportCount >= 5) {
            reportedComment.blind();
        }
    }

    private void reportNickname(
            final Member reporter,
            final ReportRequest request
    ) {
        final Member reportedMember = memberRepository.findById(request.id())
                .orElseThrow(() -> new NotFoundException(MemberExceptionType.NONEXISTENT_MEMBER));
        validateNickname(reporter, request);

        saveReport(reporter, request);
        changeNicknameByReport(reportedMember, request.type());
    }

    private void validateNickname(
            final Member reporter,
            final ReportRequest request
    ) {
        validateMyNickname(reporter, request);
        validateDuplicatedReport(reporter, request, ReportExceptionType.DUPLICATE_NICKNAME_REPORT);
    }

    private void validateMyNickname(final Member reporter, final ReportRequest request) {
        if (Objects.equals(reporter.getId(), request.id())) {
            throw new BadRequestException(ReportExceptionType.REPORT_MY_NICKNAME);
        }
    }

    private void changeNicknameByReport(final Member reportedMember, final ReportType reportType) {
        final int reportCount = reportRepository.countByReportTypeAndTargetId(reportType, reportedMember.getId());
        reportedMember.changeNicknameByReport(reportCount);
    }

}
