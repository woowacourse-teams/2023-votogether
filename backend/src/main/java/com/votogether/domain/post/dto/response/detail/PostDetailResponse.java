package com.votogether.domain.post.dto.response.detail;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.response.CategoryResponse;
import com.votogether.domain.post.dto.response.WriterResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostCategories;
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
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime createdAt,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
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

        final PostCategories postCategories = post.getPostCategories();
        return new PostDetailResponse(
                post.getId(),
                WriterResponse.of(writer.getId(), writer.getNickname()),
                postBody.getTitle(),
                postBody.getContent(),
                convertImageUrl(contentImageUrl.toString()),
                getCategories(postCategories.getPostCategories()),
                post.getCreatedAt(),
                post.getDeadline(),
                VoteDetailResponse.of(
                        post.getPostOptions().getSelectedOptionId(loginMember),
                        post.getFinalTotalVoteCount(loginMember),
                        getOptions(post, loginMember)
                )
        );
    }

    private static String convertImageUrl(final String imageUrl) {
        return imageUrl.contains("없는사진") ? "" : imageUrl;
    }

    private static List<CategoryResponse> getCategories(final List<PostCategory> postCategories) {
        return postCategories.stream()
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

}
