package com.votogether.domain.post.dto.response.post;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.response.vote.PostVoteResultResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostCategory;
import com.votogether.domain.post.entity.PostContentImage;
import com.votogether.domain.post.entity.PostOption;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Schema(description = "게시글 응답")
public record PostResponse(
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

        @Schema(description = "카테고리 목록")
        List<CategoryResponse> categories,

        @Schema(description = "게시글 생성시간", example = "2023-08-01 13:56")
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime createdAt,

        @Schema(description = "게시글 마감시한", example = "2023-08-01 13:56")
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime deadline,

        @Schema(description = "게시글 이미지 수", example = "3")
        int imageCount,

        @Schema(description = "게시글 댓글 수", example = "23")
        int commentCount,

        @Schema(description = "게시글 투표 결과")
        PostVoteResultResponse voteInfo
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
                PostWriterResponse.of(writer.getId(), writer.getNickname()),
                postBody.getTitle(),
                postBody.getContent(),
                convertImageUrl(contentImageUrl.toString()),
                getCategories(post),
                post.getCreatedAt(),
                post.getDeadline(),
                -1,
                -1,
                PostVoteResultResponse.of(
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
                .map(CategoryResponse::from)
                .toList();
    }

    private static List<PostOptionVoteResultResponse> getOptions(
            final Post post,
            final Member loginMember
    ) {
        return post.getPostOptions()
                .getPostOptions()
                .stream()
                .map(postOption ->
                        PostOptionVoteResultResponse.of(
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
                PostWriterResponse.from(post.getWriter()),
                post.getPostBody().getTitle(),
                post.getPostBody().getContent(),
                convertImageUrl(contentImageUrl.toString()),
                getCategories(post),
                post.getCreatedAt(),
                post.getDeadline(),
                -1,
                -1,
                PostVoteResultResponse.ofGuest(post)
        );
    }

    public static PostResponse ofGuest(
            final Post post,
            final List<PostCategory> postCategories,
            final PostContentImage postContentImage,
            final List<PostOption> postOptions
    ) {
        postOptions.sort(Comparator.comparingInt(PostOption::getSequence));
        return new PostResponse(
                post.getId(),
                PostWriterResponse.from(post.getWriter()),
                post.getTitle(),
                post.getContent(),
                handleEmptyImageUrl(postContentImage),
                convertToResponses(postCategories),
                post.getCreatedAt(),
                post.getDeadline(),
                calculateImageCount(post, postOptions),
                post.getCommentCount(),
                PostVoteResultResponse.ofGuest(post, postOptions)
        );
    }

    private static String handleEmptyImageUrl(final PostContentImage postContentImage) {
        if (postContentImage == null) {
            return "";
        }
        return postContentImage.getImageUrl();
    }

    private static List<CategoryResponse> convertToResponses(final List<PostCategory> postCategories) {
        return postCategories.stream()
                .map(PostCategory::getCategory)
                .map(CategoryResponse::from)
                .toList();
    }

    private static int calculateImageCount(final Post post, final List<PostOption> postOptions) {
        int count = post.getFirstContentImage() == null ? 0 : 1;
        count += (int) postOptions.stream()
                .filter(postOption -> postOption.getImageUrl() != null)
                .count();
        return count;
    }

}
