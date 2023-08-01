package com.votogether.domain.post.dto.response.detail;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.response.CategoryResponse;
import com.votogether.domain.post.dto.response.WriterResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostCategory;
import com.votogether.domain.post.entity.PostContentImage;
import java.time.LocalDateTime;
import java.util.List;

public record PostDetailResponse(
        Long postId,
        WriterResponse writer,
        String title,
        String content,
        String imageUrl,
        List<CategoryResponse> categories,
        LocalDateTime createdAt,
        LocalDateTime deadline,
        VoteDetailResponse voteInfo
) {

    public static PostDetailResponse of(final Post post, final Member loginMember) {
        final Member writer = post.getWriter();
        final PostBody postBody = post.getPostBody();
        final List<PostContentImage> contentImages = postBody.getPostContentImages().getContentImages();
        final StringBuilder contentImageUrl = new StringBuilder();

        if (!contentImages.isEmpty()) {
            contentImageUrl.append(contentImages.get(0).getImageUrl());
        }

        return new PostDetailResponse(
                post.getId(),
                WriterResponse.of(writer.getId(), writer.getNickname().getValue()),
                postBody.getTitle(),
                postBody.getContent(),
                contentImageUrl.toString(),
                getCategories(post),
                post.getCreatedAt(),
                post.getDeadline(),
                VoteDetailResponse.of(
                        post.getPostOptions().getSelectedOptionId(loginMember),
                        post.getFinalTotalVoteCount(loginMember),
                        getOptions(post, loginMember)
                )
        );
    }

    private static List<CategoryResponse> getCategories(final Post post) {
        return post.getPostCategories().getPostCategories().stream()
                .map(PostCategory::getCategory)
                .map(CategoryResponse::of)
                .toList();
    }

    private static List<PostOptionDetailResponse> getOptions(
            final Post post,
            final Member loginMember
    ) {
        return post.getPostOptions().getPostOptions().stream()
                .map(postOption ->
                        PostOptionDetailResponse.of(
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
