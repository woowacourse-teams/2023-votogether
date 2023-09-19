package com.votogether.test.persister;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.entity.Report;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.domain.report.repository.ReportRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Persister
public class ReportTestPersister {

    private final ReportRepository reportRepository;
    private final MemberTestPersister memberTestPersister;

    public ReportBuilder builder() {
        return new ReportBuilder();
    }

    public final class ReportBuilder {

        private Member member;
        private ReportType reportType;
        private Long targetId;
        private String reason;

        public ReportBuilder member(Member member) {
            this.member = member;
            return this;
        }

        public ReportBuilder reportType(ReportType reportType) {
            this.reportType = reportType;
            return this;
        }

        public ReportBuilder targetId(Long targetId) {
            this.targetId = targetId;
            return this;
        }

        public ReportBuilder reason(String reason) {
            this.reason = reason;
            return this;
        }

        public Report save() {
            Report report = Report.builder()
                    .member(member == null ? memberTestPersister.builder().save() : member)
                    .reportType(reportType == null ? ReportType.POST : reportType)
                    .targetId(targetId == null ? 1L : targetId)
                    .reason(reason == null ? "invalid" : reason)
                    .build();
            return reportRepository.save(report);
        }

    }

}
