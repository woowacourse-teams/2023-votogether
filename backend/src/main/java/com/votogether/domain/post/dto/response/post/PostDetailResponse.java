package com.votogether.domain.post.dto.response.post;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.response.vote.PostVoteResultResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostCategories;
import com.votogether.domain.post.entity.PostCategory;
import com.votogether.domain.post.entity.PostContentImage;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.List;

@Schema(description = "게시글 상세 응답")
public record PostDetailResponse(
        @Schema(description = "게시글 ID", example = "1")
        Long postId,

        @Schema(description = "게시글 작성자")
        PostWriterResponse writer,

        @Schema(description = "게시글 제목", example = "이거 한번 투표해주세요")
        String title,

        @Schema(description = "게시글 내용", example = "어떤게 더 맛있나요?")
        String content,

        @Schema(description = "게시글 이미지 URL", example = "http://asdasdasd.com")
        String imageUrl,

        @Schema(description = "카테고리 목록", example = "[1,2]")
        List<CategoryResponse> categories,

        @Schema(description = "게시글 생성시간", example = "2023-08-01 13:56")
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime createdAt,

        @Schema(description = "게시글 마감기한", example = "2023-08-01 13:56")
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime deadline,

        @Schema(description = "투표 통계 정보")
        PostVoteResultResponse voteInfo
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
                PostWriterResponse.of(writer.getId(), writer.getNickname()),
                postBody.getTitle(),
                postBody.getContent(),
                contentImageUrl.toString(),
                getCategories(postCategories.getPostCategories()),
                post.getCreatedAt(),
                post.getDeadline(),
                PostVoteResultResponse.of(
                        post.getSelectedOptionId(loginMember),
                        post.getFinalTotalVoteCount(loginMember),
                        getOptions(post, loginMember)
                )
        );
    }

    private static List<CategoryResponse> getCategories(final List<PostCategory> postCategories) {
        return postCategories.stream()
                .map(PostCategory::getCategory)
                .map(CategoryResponse::from)
                .toList();
    }

    private static List<PostOptionVoteResultResponse> getOptions(
            final Post post,
            final Member loginMember
    ) {
        return post.getPostOptions().getPostOptions().stream()
                .map(postOption ->
                        PostOptionVoteResultResponse.of(
                                postOption,
                                post.isVisibleVoteResult(loginMember),
                                post.getFinalTotalVoteCount(loginMember)
                        )
                )
                .toList();
    }

}
