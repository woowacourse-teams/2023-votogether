package com.votogether.domain.post.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.response.vote.VoteResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostCategory;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.List;

@Schema(description = "게시글에 관련한 데이터들입니다.")
public record PostResponse(
        Long postId,
        WriterResponse writer,
        String title,
        String content,
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

        return new PostResponse(
                post.getId(),
                WriterResponse.of(writer.getId(), writer.getNickname()),
                postBody.getTitle(),
                postBody.getContent(),
                getCategories(post),
                post.getCreatedAt(),
                post.getDeadline(),
                VoteResponse.of(
                        post.getPostOptions().getSelectedOptionId(loginMember),
                        post.getFinalTotalVoteCount(loginMember),
                        getOptions(post, loginMember)
                )
        );
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
        return new PostResponse(
                post.getId(),
                WriterResponse.from(post.getWriter()),
                post.getPostBody().getTitle(),
                post.getPostBody().getContent(),
                getCategories(post),
                post.getCreatedAt(),
                post.getDeadline(),
                VoteResponse.forGuest(post)
        );
    }

}
