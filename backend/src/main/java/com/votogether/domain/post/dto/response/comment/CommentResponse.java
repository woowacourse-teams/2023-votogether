package com.votogether.domain.post.dto.response.comment;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.comment.Comment;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

@Schema(description = "댓글 응답")
public record CommentResponse(
        @Schema(description = "댓글 ID", example = "1")
        Long id,

        @Schema(description = "댓글 작성자 회원")
        CommentMember member,

        @Schema(description = "댓글 내용", example = "재밌어요!")
        String content,

        @Schema(description = "댓글 작성시각", example = "2023-08-01 10:56")
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime createdAt,

        @Schema(description = "댓글 수정시각", example = "2023-08-01 13:56")
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime updatedAt
) {

    public static CommentResponse from(final Comment comment) {
        return new CommentResponse(
                comment.getId(),
                CommentMember.from(comment.getMember()),
                comment.getContent(),
                comment.getCreatedAt(),
                comment.getUpdatedAt()
        );
    }

    @Schema(description = "댓글 작성자 회원")
    record CommentMember(
            @Schema(description = "댓글 작성자 회원 ID", example = "1")
            Long id,

            @Schema(description = "댓글 작성자 회원 닉네임", example = "votogether")
            String nickname
    ) {

        public static CommentMember from(final Member member) {
            return new CommentMember(member.getId(), member.getNickname());
        }

    }

}
