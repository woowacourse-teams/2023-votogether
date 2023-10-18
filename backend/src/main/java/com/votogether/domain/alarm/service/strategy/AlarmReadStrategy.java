package com.votogether.domain.alarm.service.strategy;

import com.votogether.domain.member.entity.Member;

public interface AlarmReadStrategy {

    void read(final Long id, final Member member);

}
