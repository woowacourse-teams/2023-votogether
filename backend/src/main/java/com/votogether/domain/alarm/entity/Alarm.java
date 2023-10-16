package com.votogether.domain.alarm.entity;

import com.votogether.domain.alarm.entity.vo.AlarmType;
import com.votogether.domain.common.BaseEntity;
import com.votogether.domain.member.entity.Member;
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
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@EqualsAndHashCode(of = {"id"}, callSuper = false)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Alarm extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private AlarmType alarmType;

    @Column(nullable = false)
    private Long targetId;

    @Column(length = 100)
    private String detail;

    @Column(nullable = false)
    private boolean isChecked;

    @Builder
    public Alarm(
            final Member member,
            final AlarmType alarmType,
            final Long targetId,
            final String detail,
            final boolean isChecked
    ) {
        this.member = member;
        this.alarmType = alarmType;
        this.targetId = targetId;
        this.detail = detail;
        this.isChecked = isChecked;
    }

}
