package com.votogether.domain.post.dto.response.post;

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
        @Schema(description = "게시글 ID", example = "1")
        Long postId,

        @Schema(description = "작성자")
        WriterResponse writer,

        @Schema(description = "게시글 제목", example = "이거 한번 투표해주세요")
        String title,

        @Schema(description = "게시글 내용", example = "어떤게 더 맛있나요?")
        String content,

        @Schema(description = "이미지 URL", example = "http://asdasdasd.com")
        String imageUrl,

        @Schema(description = "카테고리 목록", example = "[1,2]")
        List<CategoryResponse> categories,

        @Schema(description = "게시글 생성시각", example = "2023-08-01 13:56")
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime createdAt,

        @Schema(description = "게시글 마감기한", example = "2023-08-01 13:56")
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime deadline,

        @Schema(description = "투표 통계 정보")
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
