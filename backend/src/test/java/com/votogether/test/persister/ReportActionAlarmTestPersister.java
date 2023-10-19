package com.votogether.test.persister;

import com.votogether.domain.alarm.entity.ReportActionAlarm;
import com.votogether.domain.alarm.repository.ReportActionAlarmRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.entity.vo.ReportType;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Persister
public class ReportActionAlarmTestPersister {

    private final ReportActionAlarmRepository reportActionAlarmRepository;
    private final MemberTestPersister memberTestPersister;

    public ReportActionAlarmBuilder builder() {
        return new ReportActionAlarmBuilder();
    }

    public final class ReportActionAlarmBuilder {

        private Member member;
        private ReportType reportType;
        private String target;
        private String reasons;
        private boolean isChecked;

        public ReportActionAlarmBuilder member(Member member) {
            this.member = member;
            return this;
        }

        public ReportActionAlarmBuilder reportType(ReportType reportType) {
            this.reportType = reportType;
            return this;
        }

        public ReportActionAlarmBuilder target(String target) {
            this.target = target;
            return this;
        }

        public ReportActionAlarmBuilder reasons(String reasons) {
            this.reasons = reasons;
            return this;
        }

        public ReportActionAlarmBuilder isChecked(boolean isChecked) {
            this.isChecked = isChecked;
            return this;
        }

        public ReportActionAlarm save() {
            ReportActionAlarm reportActionAlarm = ReportActionAlarm.builder()
                    .member(member == null ? memberTestPersister.builder().save() : member)
                    .reportType(reportType == null ? ReportType.NICKNAME : reportType)
                    .target(target == null ? "target" : target)
                    .reasons(reasons == null ? "reasons" : reasons)
                    .isChecked(false)
                    .build();
            return reportActionAlarmRepository.save(reportActionAlarm);
        }

    }

}
