package com.votogether.domain.post.repository.dto;

import com.querydsl.core.annotations.QueryProjection;

public record PostCommentCountDto(
        Long postId,
        long commentCount
) {

    @QueryProjection
    public PostCommentCountDto {
    }
}
