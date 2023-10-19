package com.votogether.domain.report.service.strategy;

import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.repository.ReportActionAlarmRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.repository.PostRepository;
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
public class ReportPostStrategy implements ReportStrategy {

    private final PostRepository postRepository;
    private final ReportRepository reportRepository;
    private final ReportActionAlarmRepository reportActionAlarmRepository;

    @Override
    public void report(final Member reporter, final ReportRequest request) {
        final Post reportedPost = postRepository.findById(request.id())
                .orElseThrow(() -> new NotFoundException(PostExceptionType.NOT_FOUND));
        validatePost(reporter, reportedPost, request);

        saveReport(reporter, request, reportRepository);
    }

    private void validatePost(
            final Member reporter,
            final Post reportedPost,
            final ReportRequest request
    ) {
        validateHiddenPost(reportedPost);
        validatePostMine(reportedPost, reporter);
        validateDuplicatedReport(
                reporter,
                request,
                ReportExceptionType.DUPLICATE_POST_REPORT,
                reportRepository
        );
    }

    private void validateHiddenPost(final Post post) {
        if (post.isHidden()) {
            throw new BadRequestException(PostExceptionType.IS_HIDDEN);
        }
    }

    private void validatePostMine(final Post post, final Member member) {
        if (post.isWriter(member)) {
            throw new BadRequestException(PostExceptionType.REPORT_MINE);
        }
    }

    @Override
    public String parseTarget(final Long targetId) {
        return targetId.toString();
    }

    @Override
    public void reportAction(final ReportAggregateDto reportAggregateDto) {
        final Post reportedPost = postRepository.findById(reportAggregateDto.targetId())
                .orElseThrow(() -> new NotFoundException(PostExceptionType.NOT_FOUND));

        final ReportActionAlarm reportActionAlarm = ReportActionAlarm.builder()
                .member(reportedPost.getWriter())
                .reportType(reportAggregateDto.reportType())
                .target(reportedPost.getId().toString())
                .reasons(reportAggregateDto.reasons())
                .isChecked(false)
                .build();

        reportActionAlarmRepository.save(reportActionAlarm);
        reportedPost.blind();
    }

}
