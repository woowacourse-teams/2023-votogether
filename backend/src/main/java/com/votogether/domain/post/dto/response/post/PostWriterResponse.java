package com.votogether.domain.post.dto.response.post;

import com.votogether.domain.member.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "게시글 작성자 응답")
public record PostWriterResponse(
        @Schema(description = "게시글 작성자 ID", example = "1")
        Long id,

        @Schema(description = "게시글 작성자 닉네임", example = "익명의닉네임2SDSDNKLNS")
        String nickname
) {

    public static PostWriterResponse from(final Member member) {
        return new PostWriterResponse(member.getId(), member.getNickname());
    }

    public static PostWriterResponse of(final Long id, final String nickname) {
        return new PostWriterResponse(id, nickname);
    }

}
