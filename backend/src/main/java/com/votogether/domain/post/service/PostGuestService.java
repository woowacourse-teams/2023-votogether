package com.votogether.domain.post.service;

import com.votogether.domain.post.dto.response.post.PostRankingResponse;
import com.votogether.domain.post.dto.response.post.PostResponse;
import com.votogether.domain.post.dto.response.post.PostSummaryResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.repository.PostCategoryRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.post.repository.dto.PostCommentCountDto;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class PostGuestService {

    private static final int BASIC_PAGE_SIZE = 10;

    private final PostRepository postRepository;
    private final PostCategoryRepository postCategoryRepository;

    @Transactional(readOnly = true)
    public List<PostResponse> getPosts(
            final int page,
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Long categoryId
    ) {
        final Pageable pageable = PageRequest.of(page, BASIC_PAGE_SIZE);
        final List<Post> posts =
                postRepository.findPostsWithFilteringAndPaging(postClosingType, postSortType, categoryId, pageable);
        return convertToResponses(posts);
    }

    @Transactional(readOnly = true)
    public PostResponse getPost(final Long postId) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.NOT_FOUND));
        validateHiddenPost(post);

        final Map<Long, Long> postCommentCountMapper = generatePostCommentCountMapper(List.of(post));
        return PostResponse.ofGuest(
                post,
                postCategoryRepository.findAllByPost(post),
                post.getFirstContentImage(),
                post.getPostOptions(),
                postCommentCountMapper.getOrDefault(post.getId(), 0L)
        );
    }

    @Transactional(readOnly = true)
    public List<PostResponse> searchPosts(
            final String keyword,
            final int page,
            final PostClosingType postClosingType,
            final PostSortType postSortType
    ) {
        final Pageable pageable = PageRequest.of(page, BASIC_PAGE_SIZE);
        final List<Post> posts =
                postRepository.findSearchPostsWithFilteringAndPaging(keyword, postClosingType, postSortType, pageable);
        return convertToResponses(posts);
    }

    private void validateHiddenPost(final Post post) {
        if (post.isHidden()) {
            throw new BadRequestException(PostExceptionType.IS_HIDDEN);
        }
    }

    private List<PostResponse> convertToResponses(final List<Post> posts) {
        final Map<Long, Long> postCommentCountMapper = generatePostCommentCountMapper(posts);
        return posts.stream()
                .map(post ->
                        PostResponse.ofGuest(
                                post,
                                postCategoryRepository.findAllByPost(post),
                                post.getFirstContentImage(),
                                post.getPostOptions(),
                                postCommentCountMapper.getOrDefault(post.getId(), 0L)
                        )
                )
                .toList();
    }

    private Map<Long, Long> generatePostCommentCountMapper(final List<Post> posts) {
        final List<PostCommentCountDto> postCommentCountDtos =
                postRepository.getCommentCountsInPosts(posts.stream().map(Post::getId).collect(Collectors.toSet()));
        return postCommentCountDtos.stream()
                .collect(Collectors.toMap(
                        PostCommentCountDto::postId,
                        PostCommentCountDto::commentCount,
                        (exist, replace) -> replace,
                        HashMap::new
                ));
    }

    @Transactional(readOnly = true)
    public List<PostRankingResponse> getRanking() {
        final Pageable pageable = PageRequest.of(0, BASIC_PAGE_SIZE);
        final List<Post> posts = postRepository.findPostsWithFilteringAndPaging(
                PostClosingType.ALL,
                PostSortType.HOT,
                null,
                pageable
        );

        final Map<Post, Integer> rankings = calculateRanking(posts);

        return rankings.entrySet().stream()
                .map(entry ->
                        new PostRankingResponse(
                                entry.getValue(),
                                PostSummaryResponse.from(entry.getKey())
                        )
                )
                .toList();
    }

    private Map<Post, Integer> calculateRanking(final List<Post> posts) {
        final Map<Post, Integer> rankings = new LinkedHashMap<>();

        int currentRanking = 1;
        int previousRanking = -1;
        long previousVoteCount = -1;
        for (Post post : posts) {
            final long currentVoteCount = post.getVoteCount();
            final int ranking = (currentVoteCount == previousVoteCount) ? previousRanking : currentRanking;
            rankings.put(post, ranking);

            previousRanking = ranking;
            previousVoteCount = currentVoteCount;
            currentRanking++;
        }

        return rankings;
    }

}
