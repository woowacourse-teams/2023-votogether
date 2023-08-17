package com.votogether.domain.vote.repository.dto;

import com.votogether.domain.member.entity.vo.Gender;

public record VoteStatus(
        Integer birthYear,
        Gender gender,
        long count
) {
}
