package com.votogether.domain.post.dto.response.post;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostCategory;
import com.votogether.domain.post.entity.PostContentImage;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.vote.entity.Vote;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

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
        long commentCount,

        @Schema(description = "게시글 투표 결과")
        PostVoteResultResponse voteInfo
) {

    private static final String EMPTY_IMAGE_URL = "";
    private static final int EMPTY_POST_CONTENT_IMAGE_COUNT = 0;
    private static final int EXIST_POST_CONTENT_IMAGE_COUNT = 1;

    public static PostResponse ofUser(
            final Member user,
            final Post post,
            final List<PostCategory> postCategories,
            final PostContentImage postContentImage,
            final List<PostOption> postOptions,
            final Optional<Vote> vote,
            final long commentCount
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
                calculateImageCount(postContentImage, postOptions),
                commentCount,
                PostVoteResultResponse.ofUser(user, post, postOptions, vote)
        );
    }

    private static String handleEmptyImageUrl(final PostContentImage postContentImage) {
        if (postContentImage == null) {
            return EMPTY_IMAGE_URL;
        }
        return postContentImage.getImageUrl();
    }

    private static List<CategoryResponse> convertToResponses(final List<PostCategory> postCategories) {
        return postCategories.stream()
                .map(PostCategory::getCategory)
                .map(CategoryResponse::from)
                .toList();
    }

    private static int calculateImageCount(
            final PostContentImage postContentImage,
            final List<PostOption> postOptions
    ) {
        int count = countEmptyPostContentImage(postContentImage);
        count += (int) postOptions.stream()
                .filter(postOption -> postOption.getImageUrl() != null)
                .count();
        return count;
    }

    private static int countEmptyPostContentImage(final PostContentImage postContentImage) {
        if (postContentImage == null) {
            return EMPTY_POST_CONTENT_IMAGE_COUNT;
        }
        return EXIST_POST_CONTENT_IMAGE_COUNT;
    }

    public static PostResponse ofGuest(
            final Post post,
            final List<PostCategory> postCategories,
            final PostContentImage postContentImage,
            final List<PostOption> postOptions,
            final long commentCount
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
                calculateImageCount(postContentImage, postOptions),
                commentCount,
                PostVoteResultResponse.ofGuest(post, postOptions)
        );
    }

}
