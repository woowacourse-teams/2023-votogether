package com.votogether.domain.member.dto;

public record MemberInfoResponse(
        String nickname,
        Integer point,
        int numberOfPost,
        int numberOfVote
) {
}
