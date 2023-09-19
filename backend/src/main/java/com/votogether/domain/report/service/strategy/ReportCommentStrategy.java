package com.votogether.domain.report.service.strategy;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.domain.post.exception.CommentExceptionType;
import com.votogether.domain.post.repository.CommentRepository;
import com.votogether.domain.report.dto.request.ReportRequest;
import com.votogether.domain.report.exception.ReportExceptionType;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class ReportCommentStrategy implements ReportStrategy {

    private static final int NUMBER_OF_COMMENT_BLIND_BASED_REPORTS = 5;

    private final CommentRepository commentRepository;
    private final ReportRepository reportRepository;

    @Override
    public void report(final Member reporter, final ReportRequest request) {
        final Comment reportedComment = commentRepository.findById(request.id())
                .orElseThrow(() -> new NotFoundException(CommentExceptionType.NOT_FOUND));
        validateComment(reporter, request, reportedComment);

        saveReport(reporter, request, reportRepository);
        blindComment(request, reportedComment);
    }

    private void validateComment(
            final Member reporter,
            final ReportRequest request,
            final Comment reportedComment
    ) {
        validateHiddenComment(reportedComment);
        validateCommentMine(reportedComment, reporter);
        validateDuplicatedReport(
                reporter,
                request,
                ReportExceptionType.DUPLICATE_COMMENT_REPORT,
                reportRepository
        );
    }

    private void blindComment(final ReportRequest request, final Comment reportedComment) {
        final int reportCount = reportRepository.countByReportTypeAndTargetId(request.type(), request.id());
        if (reportCount >= NUMBER_OF_COMMENT_BLIND_BASED_REPORTS) {
            reportedComment.blind();
        }
    }

    private void validateHiddenComment(final Comment comment) {
        if (comment.isHidden()) {
            throw new BadRequestException(CommentExceptionType.IS_HIDDEN);
        }
    }

    private void validateCommentMine(final Comment comment, final Member member) {
        if (comment.isWriter(member)) {
            throw new BadRequestException(CommentExceptionType.REPORT_MINE);
        }
    }

}
