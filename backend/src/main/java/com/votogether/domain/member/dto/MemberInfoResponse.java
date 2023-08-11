package com.votogether.domain.member.dto;

import com.votogether.domain.member.entity.Gender;

public record MemberInfoResponse(
        String nickname,
        Gender gender,
        Integer birthYear,
        int postCount,
        int voteCount
) {
}
