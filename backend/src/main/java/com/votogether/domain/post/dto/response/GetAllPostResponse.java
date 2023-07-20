package com.votogether.domain.post.dto.response;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostCategory;
import com.votogether.domain.post.entity.PostOptions;
import java.time.LocalDateTime;
import java.util.List;

public record GetAllPostResponse(
        Long postId,
        WriterResponse writer,
        String title,
        String content,
        List<CategoryResponse> categories,
        LocalDateTime createdAt,
        LocalDateTime deadline,
        VoteInfoResponse voteInfo
) {

    public GetAllPostResponse(final Post post) {
        this(post, post.getMember(), post.getPostBody(), post.getPostOptions());
    }

    public GetAllPostResponse(
            final Post post,
            final Member member,
            final PostBody postBody,
            final PostOptions postOptions
    ) {
        this(
                post.getId(),
                new WriterResponse(member.getId(), member.getNickname()),
                postBody.getTitle(),
                postBody.getContent(),
                getCategories(post),
                post.getCreatedAt(),
                post.getDeadline(),
                new VoteInfoResponse(member, postOptions, post.getTotalVoteCount())
        );
    }

    private static List<CategoryResponse> getCategories(final Post post) {
        return post.getPostCategories().getPostCategories().stream()
                .map(PostCategory::getCategory)
                .map(CategoryResponse::new)
                .toList();
    }

    @Override
    public String toString() {
        return "GetAllPostResponse{" +
                "postId=" + postId +
                ", writer=" + writer +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", categories=" + categories +
                ", createdAt=" + createdAt +
                ", deadline=" + deadline +
                ", voteInfo=" + voteInfo +
                '}' + "\n\n";
    }

}
