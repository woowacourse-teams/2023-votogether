package com.votogether.domain.report.service.strategy;

import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.repository.ReportActionAlarmRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.comment.Comment;
import com.votogether.domain.post.exception.CommentExceptionType;
import com.votogether.domain.post.repository.CommentRepository;
import com.votogether.domain.report.dto.ReportAggregateDto;
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

    private final CommentRepository commentRepository;
    private final ReportRepository reportRepository;
    private final ReportActionAlarmRepository reportActionAlarmRepository;

    @Override
    public void report(final Member reporter, final ReportRequest request) {
        final Comment reportedComment = commentRepository.findById(request.id())
                .orElseThrow(() -> new NotFoundException(CommentExceptionType.NOT_FOUND));
        validateComment(reporter, request, reportedComment);

        saveReport(reporter, request, reportRepository);
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

    @Override
    public String parseTarget(final Long targetId) {
        final Comment reportedComment = commentRepository.findById(targetId)
                .orElseThrow(() -> new NotFoundException(CommentExceptionType.NOT_FOUND));
        return reportedComment.getContent();
    }

    @Override
    public void reportAction(final ReportAggregateDto reportAggregateDto) {
        final Comment comment = commentRepository.findById(reportAggregateDto.targetId())
                .orElseThrow(() -> new NotFoundException(CommentExceptionType.NOT_FOUND));

        final ReportActionAlarm reportActionAlarm = ReportActionAlarm.builder()
                .member(comment.getWriter())
                .reportType(reportAggregateDto.reportType())
                .target(comment.getContent())
                .reasons(reportAggregateDto.reasons())
                .isChecked(false)
                .build();

        reportActionAlarmRepository.save(reportActionAlarm);
        comment.blind();
    }

}
