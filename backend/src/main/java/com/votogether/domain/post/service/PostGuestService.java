package com.votogether.domain.post.service;

import com.votogether.domain.post.dto.response.post.PostResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.repository.PostCategoryRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import java.util.List;
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
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_NOT_FOUND));
        validateHiddenPost(post);

        return PostResponse.ofGuest(
                post,
                postCategoryRepository.findAllByPost(post),
                post.getFirstContentImage(),
                post.getPostOptions()
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
            throw new BadRequestException(PostExceptionType.POST_IS_HIDDEN);
        }
    }

    private List<PostResponse> convertToResponses(final List<Post> posts) {
        return posts.stream()
                .map(post ->
                        PostResponse.ofGuest(
                                post,
                                postCategoryRepository.findAllByPost(post),
                                post.getFirstContentImage(),
                                post.getPostOptions()
                        )
                )
                .toList();
    }

}
