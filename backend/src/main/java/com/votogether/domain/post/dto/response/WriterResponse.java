package com.votogether.domain.post.dto.response;

import com.votogether.domain.member.entity.Member;

public record WriterResponse(
        Long id,
        String nickname
) {

    public static WriterResponse from(final Member member) {
        return new WriterResponse(member.getId(), member.getNickname());
    }

    public static WriterResponse of(final Long id, final String nickname) {
        return new WriterResponse(id, nickname);
    }

}
