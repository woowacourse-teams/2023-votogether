package com.votogether.domain.post.dto.response.post;

import com.votogether.domain.member.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "작성자 응답")
public record WriterResponse(
        @Schema(description = "작성자 ID", example = "1")
        Long id,

        @Schema(description = "작성자 닉네임", example = "익명의닉네임2SDSDNKLNS")
        String nickname
) {

    public static WriterResponse from(final Member member) {
        return new WriterResponse(member.getId(), member.getNickname());
    }

    public static WriterResponse of(final Long id, final String nickname) {
        return new WriterResponse(id, nickname);
    }

}
