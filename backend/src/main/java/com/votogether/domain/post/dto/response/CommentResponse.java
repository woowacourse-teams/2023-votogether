package com.votogether.domain.post.dto.response;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.comment.Comment;
import java.time.LocalDateTime;

public record CommentResponse(
        Long id,
        CommentMember member,
        String content,
        LocalDateTime createdAt,
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

    record CommentMember(Long id, String nickname) {

        public static CommentMember from(final Member member) {
            return new CommentMember(member.getId(), member.getNickname());
        }

    }

}
