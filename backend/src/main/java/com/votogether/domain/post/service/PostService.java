package com.votogether.domain.post.service;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.vo.AgeRange;
import com.votogether.domain.member.entity.vo.Gender;
import com.votogether.domain.member.exception.MemberExceptionType;
import com.votogether.domain.post.dto.request.post.PostCreateRequest;
import com.votogether.domain.post.dto.request.post.PostOptionCreateRequest;
import com.votogether.domain.post.dto.request.post.PostOptionUpdateRequest;
import com.votogether.domain.post.dto.request.post.PostUpdateRequest;
import com.votogether.domain.post.dto.response.post.PostCompactResponse;
import com.votogether.domain.post.dto.response.post.PostDetailResponse;
import com.votogether.domain.post.dto.response.post.PostRankingResponse;
import com.votogether.domain.post.dto.response.post.PostResponse;
import com.votogether.domain.post.dto.response.vote.VoteOptionStatisticsResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.entity.vo.PostClosingType;
import com.votogether.domain.post.entity.vo.PostSortType;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.repository.PostOptionRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.vote.repository.VoteRepository;
import com.votogether.domain.vote.repository.dto.VoteStatus;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import com.votogether.global.util.ImageUploader;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class PostService {

    private static final int BASIC_PAGING_SIZE = 10;
    private static final int MAXIMUM_DEADLINE = 3;

    private final Map<PostClosingType, BiFunction<Member, Pageable, Slice<Post>>> postsVotedByMemberMapper;
    private final PostRepository postRepository;
    private final PostOptionRepository postOptionRepository;
    private final CategoryRepository categoryRepository;
    private final VoteRepository voteRepository;

    public PostService(
            final PostRepository postRepository,
            final PostOptionRepository postOptionRepository,
            final CategoryRepository categoryRepository,
            final VoteRepository voteRepository
    ) {
        this.postRepository = postRepository;
        this.postOptionRepository = postOptionRepository;
        this.categoryRepository = categoryRepository;
        this.voteRepository = voteRepository;
        this.postsVotedByMemberMapper = new EnumMap<>(PostClosingType.class);
        initPostsVotedByMemberMapper();
    }

    private void initPostsVotedByMemberMapper() {
        postsVotedByMemberMapper.put(PostClosingType.ALL, postRepository::findPostsVotedByMember);
        postsVotedByMemberMapper.put(PostClosingType.PROGRESS, postRepository::findOpenPostsVotedByMember);
        postsVotedByMemberMapper.put(PostClosingType.CLOSED, postRepository::findClosedPostsVotedByMember);
    }

    @Transactional
    public Long save(
            final PostCreateRequest postCreateRequest,
            final Member loginMember,
            final List<MultipartFile> contentImages,
            final List<MultipartFile> optionImages
    ) {
        final List<Category> categories = categoryRepository.findAllById(postCreateRequest.categoryIds());
        final Post post = toPostEntity(postCreateRequest, loginMember, contentImages, optionImages, categories);
        post.validateDeadlineNotExceedByMaximumDeadline(MAXIMUM_DEADLINE);

        return postRepository.save(post).getId();
    }

    private Post toPostEntity(
            final PostCreateRequest postCreateRequest,
            final Member loginMember,
            final List<MultipartFile> contentImages,
            final List<MultipartFile> optionImages,
            final List<Category> categories
    ) {
        final Post post = toPost(postCreateRequest, loginMember);

        post.mapPostOptionsByElements(
                transformElements(postCreateRequest.postOptions(), PostOptionCreateRequest::content),
                transformElements(optionImages, ImageUploader::upload)
        );
        post.mapCategories(categories);
        addContentImageIfPresent(post, contentImages);

        return post;
    }

    private Post toPost(
            final PostCreateRequest postCreateRequest,
            final Member loginMember
    ) {
        return Post.builder()
                .writer(loginMember)
                .postBody(toPostBody(postCreateRequest.title(), postCreateRequest.content()))
                .deadline(postCreateRequest.deadline())
                .build();
    }

    private PostBody toPostBody(final String title, final String content) {
        return PostBody.builder()
                .title(title)
                .content(content)
                .build();
    }

    private void addContentImageIfPresent(final Post post, final List<MultipartFile> contentImages) {
        if (isContentImagesPresent(contentImages)) {
            post.addContentImage(ImageUploader.upload(contentImages.get(0)));
        }
    }

    private boolean isContentImagesPresent(final List<MultipartFile> contentImages) {
        return Objects.nonNull(contentImages) && !contentImages.isEmpty();
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getAllPostBySortTypeAndClosingTypeAndCategoryId(
            final int page,
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Long categoryId,
            final Member loginMember
    ) {
        final Pageable pageable = PageRequest.of(page, BASIC_PAGING_SIZE, postSortType.getPostBaseSort());
        final List<Post> posts = postRepository.findAllByClosingTypeAndSortTypeAndCategoryId(
                postClosingType,
                postSortType,
                categoryId,
                pageable
        );
        return posts.stream()
                .map(post -> PostResponse.of(post, loginMember))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getPostsGuest(
            final int page,
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Long categoryId
    ) {
        final Pageable pageable = PageRequest.of(page, BASIC_PAGING_SIZE);
        final List<Post> posts = postRepository.findAllByClosingTypeAndSortTypeAndCategoryId(
                postClosingType,
                postSortType,
                categoryId,
                pageable
        );

        return transformElements(posts, PostResponse::forGuest);
    }

    @Transactional(readOnly = true)
    public PostDetailResponse getPostById(final Long postId, final Member loginMember) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_NOT_FOUND));

        return PostDetailResponse.of(post, loginMember);
    }

    @Transactional(readOnly = true)
    public VoteOptionStatisticsResponse getVoteStatistics(final long postId, final Member member) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_NOT_FOUND));

        post.validateWriter(member);

        final List<VoteStatus> voteStatuses =
                voteRepository.findVoteCountByPostIdGroupByAgeRangeAndGender(post.getId());
        return VoteOptionStatisticsResponse.from(groupVoteStatus(voteStatuses));
    }

    @Transactional(readOnly = true)
    public VoteOptionStatisticsResponse getVoteOptionStatistics(
            final long postId,
            final long optionId,
            final Member member
    ) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_NOT_FOUND));
        final PostOption postOption = postOptionRepository.findById(optionId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_OPTION_NOT_FOUND));

        if (!postOption.isBelongsTo(post)) {
            throw new BadRequestException(PostExceptionType.UNRELATED_POST_OPTION);
        }
        post.validateWriter(member);

        final List<VoteStatus> voteStatuses =
                voteRepository.findVoteCountByPostOptionIdGroupByAgeRangeAndGender(postOption.getId());
        return VoteOptionStatisticsResponse.from(groupVoteStatus(voteStatuses));
    }

    private Map<String, Map<Gender, Long>> groupVoteStatus(final List<VoteStatus> voteStatuses) {
        return voteStatuses.stream()
                .collect(Collectors.groupingBy(
                        status -> groupAgeRange(status.birthYear()),
                        LinkedHashMap::new,
                        Collectors.groupingBy(
                                VoteStatus::gender,
                                LinkedHashMap::new,
                                Collectors.summingLong(VoteStatus::count)
                        )
                ));
    }

    private String groupAgeRange(final Integer birthYear) {
        final int age = LocalDate.now().getYear() - birthYear + 1;
        if (age <= 0) {
            throw new BadRequestException(MemberExceptionType.INVALID_AGE);
        }
        return AgeRange.from(age).getName();
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getPostsVotedByMember(
            final int page,
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Member member
    ) {
        final Pageable pageable = PageRequest.of(page, BASIC_PAGING_SIZE, postSortType.getVoteBaseSort());

        Slice<Post> posts = postsVotedByMemberMapper.get(postClosingType).apply(member, pageable);

        return posts.stream()
                .map(post -> PostResponse.of(post, member))
                .toList();
    }

    @Transactional
    public void closePostEarlyById(final Long id, final Member loginMember) {
        final Post post = postRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_NOT_FOUND));

        post.validateWriter(loginMember);
        post.validateDeadLine();
        post.closeEarly();
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getPostsByWriter(
            final int page,
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Long categoryId,
            final Member member
    ) {
        final Pageable pageable = PageRequest.of(page, BASIC_PAGING_SIZE);
        final List<Post> posts = postRepository.findAllByWriterWithClosingTypeAndSortTypeAndCategoryId(
                member,
                postClosingType,
                postSortType,
                categoryId,
                pageable
        );

        return posts.stream()
                .map(post -> PostResponse.of(post, member))
                .toList();
    }

    public List<PostResponse> searchPostsWithKeyword(
            final String keyword,
            final int page,
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Long categoryId,
            final Member member
    ) {
        final Pageable pageable = PageRequest.of(page, BASIC_PAGING_SIZE);
        final List<Post> posts =
                postRepository.findAllWithKeyword(keyword, postClosingType, postSortType, categoryId, pageable);

        return posts.stream()
                .map(post -> PostResponse.of(post, member))
                .toList();
    }

    public List<PostResponse> searchPostsWithKeywordForGuest(
            final String keyword,
            final int page,
            final PostClosingType postClosingType,
            final PostSortType postSortType,
            final Long categoryId
    ) {
        final Pageable pageable = PageRequest.of(page, BASIC_PAGING_SIZE);
        final List<Post> posts =
                postRepository.findAllWithKeyword(keyword, postClosingType, postSortType, categoryId, pageable);

        return posts.stream()
                .map(PostResponse::forGuest)
                .toList();
    }

    @Transactional
    public void delete(final Long postId) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new BadRequestException(PostExceptionType.POST_NOT_FOUND));
        post.validatePossibleToDelete();

        postRepository.deleteById(postId);
    }

    @Transactional
    public void update(
            final long postId,
            final PostUpdateRequest request,
            final Member member,
            final List<MultipartFile> contentImages,
            final List<MultipartFile> optionImages
    ) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new BadRequestException(PostExceptionType.POST_NOT_FOUND));

        post.validateExistVote();
        post.validateWriter(member);
        post.validateDeadLine();
        post.validateDeadLineToModify(request.deadline());

        postOptionsInit(post);
        post.update(
                toPostBody(request.title(), request.content()),
                request.imageUrl(),
                transformElements(contentImages, ImageUploader::upload),
                categoryRepository.findAllById(request.categoryIds()),
                transformElements(request.postOptions(), PostOptionUpdateRequest::content),
                transformElements(request.postOptions(), PostOptionUpdateRequest::imageUrl),
                transformElements(optionImages, ImageUploader::upload),
                request.deadline()
        );
    }

    private void postOptionsInit(final Post post) {
        post.postOptionsClear();
        postRepository.flush();
    }

    private <T, R> List<R> transformElements(final List<T> elements, final Function<T, R> process) {
        return elements.stream()
                .map(process)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<PostRankingResponse> getRanking() {
        final List<Post> posts = postRepository.findAllByClosingTypeAndSortTypeAndCategoryId(
                PostClosingType.ALL,
                PostSortType.HOT,
                null,
                PageRequest.of(0, BASIC_PAGING_SIZE)
        );

        final Map<Post, Integer> rankings = calculateRanking(posts);

        return rankings.entrySet().stream()
                .sorted(Comparator.comparingInt(entry -> entry.getValue()))
                .map(entry ->
                        new PostRankingResponse(
                                entry.getValue(),
                                PostCompactResponse.from(entry.getKey())
                        )
                )
                .toList();
    }

    private Map<Post, Integer> calculateRanking(final List<Post> posts) {
        final List<Post> sortedPosts = posts.stream()
                .sorted(Comparator.comparingLong(post -> -post.getTotalVoteCount()))
                .toList();

        final Map<Post, Integer> rankings = new HashMap<>();

        int currentRanking = 1;
        int previousRanking = -1;
        long previousVoteCount = -1;
        for (Post post : sortedPosts) {
            final long currentVoteCount = post.getTotalVoteCount();
            final int ranking = (currentVoteCount == previousVoteCount) ? previousRanking : currentRanking;

            rankings.put(post, ranking);

            previousRanking = ranking;
            previousVoteCount = currentVoteCount;
            currentRanking++;
        }

        return rankings;
    }
}

