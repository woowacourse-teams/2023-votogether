package com.votogether.test.persister;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.domain.report.repository.ReportRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Persister
public class ReportTestPersister {

    private final ReportRepository reportRepository;
    private final MemberTestPersister memberTestPersister;

    public ReportBuilder builder() {
        return new ReportTestPersister.ReportBuilder();
    }

    public final class ReportBuilder {

        private Member member;
        private ReportType reportType;
        private Long targetId;
        private String reason;

        public ReportBuilder member(final Member member) {
            this.member = member;
            return this;
        }

        public ReportBuilder reportType(final ReportType reportType) {
            this.reportType = reportType;
            return this;
        }

        public ReportBuilder targetId(final Long targetId) {
            this.targetId = targetId;
            return this;
        }

        public ReportBuilder reason(final String reason) {
            this.reason = reason;
            return this;
        }

        public Report save() {
            Report report = Report.builder()
                    .member(member == null ? memberTestPersister.builder().save() : member)
                    .reportType(reportType == null ? ReportType.POST : reportType)
                    .targetId(targetId == null ? 1L : targetId)
                    .reason(reason == null ? "reason" : reason)
                    .build();

            return reportRepository.save(report);
        }
    }
}
