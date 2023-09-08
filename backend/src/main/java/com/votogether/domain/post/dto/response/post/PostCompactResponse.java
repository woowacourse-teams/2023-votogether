package com.votogether.domain.post.dto.response.post;

import com.votogether.domain.post.entity.Post;

public record PostCompactResponse(

        Long id,
        String writer,
        String title,
        long voteCount

) {

    public static PostCompactResponse of(final Post post) {
        return new PostCompactResponse(
                post.getId(),
                post.getWriter().getNickname(),
                post.getPostBody().getTitle(),
                post.getTotalVoteCount()
        );
    }

}
