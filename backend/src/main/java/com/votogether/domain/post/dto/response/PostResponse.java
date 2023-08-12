package com.votogether.domain.post.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.response.vote.VoteResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostCategory;
import com.votogether.domain.post.entity.PostContentImage;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.List;

@Schema(description = "게시글에 관련한 데이터들입니다.")
public record PostResponse(
        Long postId,
        WriterResponse writer,
        String title,
        String content,
        String imageUrl,
        List<CategoryResponse> categories,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime createdAt,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime deadline,

        VoteResponse voteInfo
) {

    public static PostResponse of(final Post post, final Member loginMember) {
        final Member writer = post.getWriter();
        final PostBody postBody = post.getPostBody();
        final List<PostContentImage> contentImages = postBody.getPostContentImages().getContentImages();
        final StringBuilder contentImageUrl = new StringBuilder();

        if (!contentImages.isEmpty()) {
            contentImageUrl.append(contentImages.get(0).getImageUrl());
        }

        return new PostResponse(
                post.getId(),
                WriterResponse.of(writer.getId(), writer.getNickname()),
                postBody.getTitle(),
                postBody.getContent(),
                convertImageUrl(contentImageUrl.toString()),
                getCategories(post),
                post.getCreatedAt(),
                post.getDeadline(),
                VoteResponse.of(
                        post.getSelectedOptionId(loginMember),
                        post.getFinalTotalVoteCount(loginMember),
                        getOptions(post, loginMember)
                )
        );
    }

    private static String convertImageUrl(final String imageUrl) {
        return imageUrl == null ? "" : imageUrl;
    }

    private static List<CategoryResponse> getCategories(final Post post) {
        return post.getPostCategories()
                .getPostCategories()
                .stream()
                .map(PostCategory::getCategory)
                .map(CategoryResponse::of)
                .toList();
    }

    private static List<PostOptionResponse> getOptions(
            final Post post,
            final Member loginMember
    ) {
        return post.getPostOptions()
                .getPostOptions()
                .stream()
                .map(postOption ->
                        PostOptionResponse.of(
                                postOption,
                                post.isVisibleVoteResult(loginMember),
                                post.getFinalTotalVoteCount(loginMember)
                        )
                )
                .toList();
    }

    public static PostResponse forGuest(final Post post) {
        final PostBody postBody = post.getPostBody();
        final List<PostContentImage> contentImages = postBody.getPostContentImages().getContentImages();
        final StringBuilder contentImageUrl = new StringBuilder();

        if (!contentImages.isEmpty()) {
            contentImageUrl.append(contentImages.get(0).getImageUrl());
        }

        return new PostResponse(
                post.getId(),
                WriterResponse.from(post.getWriter()),
                post.getPostBody().getTitle(),
                post.getPostBody().getContent(),
                convertImageUrl(contentImageUrl.toString()),
                getCategories(post),
                post.getCreatedAt(),
                post.getDeadline(),
                VoteResponse.forGuest(post)
        );
    }

}
