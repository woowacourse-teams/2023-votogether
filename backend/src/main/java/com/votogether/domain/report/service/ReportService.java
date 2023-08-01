package com.votogether.domain.report.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.report.dto.ReportRequest;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.entity.ReportType;
import com.votogether.domain.report.exception.ReportExceptionType;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.exception.BadRequestException;
import com.votogether.exception.NotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final PostRepository postRepository;

    @Transactional
    public void report(final Member member, final ReportRequest request) {
        final ReportType reportType = ReportType.valueOf(request.type());

        if (reportType == ReportType.POST) {
            reportPost(member, request, reportType);
        }

        if (reportType == ReportType.COMMENT) {

        }

        if (reportType == ReportType.NICKNAME) {

        }
    }

    private void reportPost(
            final Member member,
            final ReportRequest request,
            final ReportType reportType
    ) {
        final List<Post> reporterPosts = postRepository.findAllByWriter(member);
        final Post reportedPost = postRepository.findById(request.id())
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_NOT_FOUND));
        validatePost(reporterPosts, reportedPost);

        final Report report = Report.builder()
                .member(member)
                .reportType(reportType)
                .targetId(request.id())
                .build();
        validateDuplicatedReport(member, request, reportType);
        reportRepository.save(report);
        blindPost(request, reportType, reportedPost);
    }

    private void validatePost(final List<Post> reporterPosts, final Post reportedPost) {
        validateMine(reporterPosts, reportedPost);
        validateHidden(reportedPost);
    }

    private void validateMine(final List<Post> reporterPosts, final Post reportedPost) {
        reporterPosts.stream()
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

    private void validateDuplicatedReport(final Member member, final ReportRequest request,
                                          final ReportType reportType) {
        reportRepository.findByMemberAndReportTypeAndTargetId(member, reportType, request.id())
                .ifPresent(it -> {
                    throw new BadRequestException(ReportExceptionType.DUPLICATE_POST_REPORT);
                });
    }

    private void blindPost(
            final ReportRequest request,
            final ReportType reportType,
            final Post reportedPost
    ) {
        final int reportCount = reportRepository.countByReportTypeAndTargetId(reportType, request.id());
        if (reportCount >= 5) {
            reportedPost.blind();
        }
    }

}
