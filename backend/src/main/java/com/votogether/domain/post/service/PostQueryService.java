package com.votogether.domain.post.service;

import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.response.post.PostResponse;
import com.votogether.domain.post.dto.response.vote.VoteOptionStatisticsResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.exception.PostOptionExceptionType;
import com.votogether.domain.post.repository.PostCategoryRepository;
import com.votogether.domain.post.repository.PostOptionRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.post.repository.dto.PostCommentCountDto;
import com.votogether.domain.vote.repository.VoteRepository;
import com.votogether.domain.vote.repository.dto.VoteCountByAgeGroupAndGenderDto;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PostQueryService {

    private static final int BASIC_PAGE_SIZE = 10;

    private final PostRepository postRepository;
    private final PostCategoryRepository postCategoryRepository;
    private final PostOptionRepository postOptionRepository;
    private final VoteRepository voteRepository;

    public List<PostResponse> getPosts(
            final int page,
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Long categoryId,
            final Member loginMember
    ) {
        final Pageable pageable = PageRequest.of(page, BASIC_PAGE_SIZE);
        final List<Post> posts =
                postRepository.findPostsWithFilteringAndPaging(postClosingType, postSortType, categoryId, pageable);
        return convertToResponses(posts, loginMember);
    }

    public PostResponse getPost(final Long postId, final Member loginMember) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.NOT_FOUND));
        final Map<Long, Long> postCommentCountMapper = generatePostCommentCountMapper(List.of(post));

        if (post.isWriter(loginMember) && post.isHidden()) {
            return createPostResponse(loginMember, post, postCommentCountMapper.getOrDefault(post.getId(), 0L));
        }

        validateHiddenPost(post);
        return createPostResponse(loginMember, post, postCommentCountMapper.getOrDefault(post.getId(), 0L));
    }

    public List<PostResponse> searchPosts(
            final String keyword,
            final int page,
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Member loginMember
    ) {
        final Pageable pageable = PageRequest.of(page, BASIC_PAGE_SIZE);
        final List<Post> posts =
                postRepository.findSearchPostsWithFilteringAndPaging(keyword, postClosingType, postSortType, pageable);
        return convertToResponses(posts, loginMember);
    }

    public List<PostResponse> getPostsWrittenByMe(
            final int page,
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Member loginMember
    ) {
        final Pageable pageable = PageRequest.of(page, BASIC_PAGE_SIZE);
        final List<Post> posts = postRepository.findPostsByWriterWithFilteringAndPaging(
                loginMember,
                postClosingType,
                postSortType,
                pageable
        );
        return convertToResponses(posts, loginMember);
    }

    public List<PostResponse> getPostsVotedByMe(
            final int page,
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Member loginMember
    ) {
        final Pageable pageable = PageRequest.of(page, BASIC_PAGE_SIZE);
        final List<Post> posts = postRepository.findPostsByVotedWithFilteringAndPaging(
                loginMember,
                postClosingType,
                postSortType,
                pageable
        );
        return convertToResponses(posts, loginMember);
    }

    public VoteOptionStatisticsResponse getVoteStatistics(final Long postId, final Member loginMember) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.NOT_FOUND));
        validateHiddenPost(post);
        validatePostWriter(post, loginMember);

        final List<VoteCountByAgeGroupAndGenderDto> result =
                voteRepository.findPostVoteCountByAgeGroupAndGender(post.getId())
                        .stream()
                        .map(VoteCountByAgeGroupAndGenderDto::from)
                        .toList();
        return VoteOptionStatisticsResponse.from(result);
    }

    public VoteOptionStatisticsResponse getVoteOptionStatistics(
            final Long postId,
            final Long optionId,
            final Member loginMember
    ) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.NOT_FOUND));
        final PostOption postOption = postOptionRepository.findById(optionId)
                .orElseThrow(() -> new NotFoundException(PostOptionExceptionType.NOT_FOUND));
        validateHiddenPost(post);
        validatePostWriter(post, loginMember);
        validatePostOptionBelongPost(post, postOption);

        final List<VoteCountByAgeGroupAndGenderDto> result =
                voteRepository.findPostOptionVoteCountByAgeGroupAndGender(postOption.getId())
                        .stream()
                        .map(VoteCountByAgeGroupAndGenderDto::from)
                        .toList();
        return VoteOptionStatisticsResponse.from(result);
    }

    private void validateHiddenPost(final Post post) {
        if (post.isHidden()) {
            throw new BadRequestException(PostExceptionType.IS_HIDDEN);
        }
    }

    private void validatePostWriter(final Post post, final Member member) {
        if (!post.isWriter(member)) {
            throw new BadRequestException(PostExceptionType.NOT_WRITER);
        }
    }

    private void validatePostOptionBelongPost(final Post post, final PostOption postOption) {
        if (!postOption.belongsTo(post)) {
            throw new BadRequestException(PostOptionExceptionType.UNRELATED_POST);
        }
    }

    private List<PostResponse> convertToResponses(final List<Post> posts, final Member member) {
        final Map<Long, Long> postCommentCountMapper = generatePostCommentCountMapper(posts);
        return posts.stream()
                .map(post ->
                        createPostResponse(member, post, postCommentCountMapper.getOrDefault(post.getId(), 0L)))
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

    private PostResponse createPostResponse(Member loginMember, Post post, final long commentCount) {
        return PostResponse.ofUser(
                loginMember,
                post,
                postCategoryRepository.findAllByPost(post),
                post.getFirstContentImage(),
                post.getPostOptions(),
                voteRepository.findByMemberAndPostOptionPost(loginMember, post),
                commentCount
        );
    }

}
