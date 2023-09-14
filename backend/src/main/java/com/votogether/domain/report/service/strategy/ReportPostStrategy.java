package com.votogether.domain.report.service.strategy;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.report.dto.request.ReportRequest;
import com.votogether.domain.report.exception.ReportExceptionType;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.global.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class ReportPostStrategy implements ReportStrategy {

    private static final int NUMBER_OF_POST_BLIND_BASED_REPORTS = 5;

    private final PostRepository postRepository;
    private final ReportRepository reportRepository;

    @Override
    public void report(
            final Member reporter,
            final ReportRequest request
    ) {
        final Post reportedPost = postRepository.findById(request.id())
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_NOT_FOUND));
        validatePost(reporter, reportedPost, request);

        saveReport(reporter, request, reportRepository);
        blindPost(request, reportedPost);
    }

    private void validatePost(
            final Member reporter,
            final Post reportedPost,
            final ReportRequest request
    ) {
        reportedPost.validateMine(reporter);
        reportedPost.validateHidden();
        validateDuplicatedReport(
                reporter,
                request,
                ReportExceptionType.DUPLICATE_POST_REPORT,
                reportRepository
        );
    }

    private void blindPost(
            final ReportRequest request,
            final Post reportedPost
    ) {
        final int reportCount = reportRepository.countByReportTypeAndTargetId(request.type(), request.id());
        if (reportCount >= NUMBER_OF_POST_BLIND_BASED_REPORTS) {
            reportedPost.blind();
        }
    }

}
