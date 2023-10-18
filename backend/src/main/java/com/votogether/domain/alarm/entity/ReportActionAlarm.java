package com.votogether.domain.alarm.entity;

import com.votogether.domain.alarm.exception.AlarmExceptionType;
import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.global.exception.BadRequestException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = {"id"}, callSuper = false)
public class ReportActionAlarm extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private ReportType reportType;

    @Column(length = 500, nullable = false)
    private String target;

    @Column(length = 500, nullable = false)
    private String reasons;

    @Column(nullable = false)
    private boolean isChecked;

    @Builder
    private ReportActionAlarm(
            final Member member,
            final ReportType reportType,
            final String target,
            final String reasons,
            final boolean isChecked
    ) {
        this.member = member;
        this.reportType = reportType;
        this.target = target;
        this.reasons = reasons;
        this.isChecked = isChecked;
    }

    public void read() {
        this.isChecked = true;
    }

    public void checkOwner(final Member member) {
        if (!Objects.equals(this.member.getId(), member.getId())) {
            throw new BadRequestException(AlarmExceptionType.NOT_OWNER);
        }
    }

}
