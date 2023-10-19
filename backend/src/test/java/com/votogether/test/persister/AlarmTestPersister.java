package com.votogether.test.persister;

import com.votogether.domain.alarm.entity.Alarm;
import com.votogether.domain.alarm.entity.vo.AlarmType;
import com.votogether.domain.alarm.repository.AlarmRepository;
import com.votogether.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Persister
public class AlarmTestPersister {

    private final AlarmRepository alarmRepository;
    private final MemberTestPersister memberTestPersister;

    public AlarmBuilder builder() {
        return new AlarmBuilder();
    }

    public final class AlarmBuilder {

        private Member member;
        private AlarmType alarmType;
        private String commentWriterNickname;
        private Long targetId;
        private String detail;
        private boolean isChecked;

        public AlarmBuilder member(Member member) {
            this.member = member;
            return this;
        }

        public AlarmBuilder alarmType(AlarmType alarmType) {
            this.alarmType = alarmType;
            return this;
        }

        public AlarmBuilder commentWriterNickname(String commentWriterNickname) {
            this.commentWriterNickname = commentWriterNickname;
            return this;
        }

        public AlarmBuilder targetId(Long targetId) {
            this.targetId = targetId;
            return this;
        }

        public AlarmBuilder detail(String detail) {
            this.detail = detail;
            return this;
        }

        public AlarmBuilder isChecked(boolean isChecked) {
            this.isChecked = isChecked;
            return this;
        }

        public Alarm save() {
            Alarm alarm = Alarm.builder()
                    .member(member == null ? memberTestPersister.builder().save() : member)
                    .alarmType(alarmType == null ? AlarmType.COMMENT : alarmType)
                    .commentWriterNickname(commentWriterNickname == null ? "nickname" : commentWriterNickname)
                    .targetId(targetId == null ? 1L : targetId)
                    .detail(detail == null ? "detail" : detail)
                    .isChecked(false)
                    .build();
            return alarmRepository.save(alarm);
        }

    }

}
