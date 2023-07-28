package com.votogether.domain.post.dto.response;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostCategory;
import java.time.LocalDateTime;
import java.util.List;

public record PostResponse(
        Long postId,
        WriterResponse writer,
        String title,
        String content,
        List<CategoryResponse> categories,
        LocalDateTime createdAt,
        LocalDateTime deadline,
        VoteResponse voteInfo
) {

    public PostResponse(final Post post, final Member loginMember) {
        this(post, post.getWriter(), post.getPostBody(), loginMember);
    }

    public PostResponse(
            final Post post,
            final Member writer,
            final PostBody postBody,
            final Member loginMember
    ) {
        this(
                post.getId(),
                new WriterResponse(writer.getId(), writer.getNickname()),
                postBody.getTitle(),
                postBody.getContent(),
                getCategories(post),
                post.getCreatedAt(),
                post.getDeadline(),
                new VoteResponse(
                        post.getPostOptions().getSelectedOptionId(loginMember),
                        post.getFinalTotalVoteCount(loginMember),
                        getOptions(post, loginMember)
                )
        );
    }

    private static List<CategoryResponse> getCategories(final Post post) {
        return post.getPostCategories().getPostCategories().stream()
                .map(PostCategory::getCategory)
                .map(CategoryResponse::new)
                .toList();
    }

    private static List<PostOptionResponse> getOptions(
            final Post post,
            final Member loginMember
    ) {
        return post.getPostOptions().getPostOptions().stream()
                .map(postOption ->
                        new PostOptionResponse(
                                postOption,
                                post.isVisibleVoteResult(loginMember),
                                post.getFinalTotalVoteCount(loginMember)
                        )
                )
                .toList();
    }

    @Override
    public String toString() {
        return "PostResponse{" +
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
