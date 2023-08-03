package com.votogether.domain.post.service;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.PostCreateRequest;
import com.votogether.domain.post.dto.request.PostOptionCreateRequest;
import com.votogether.domain.post.dto.response.PostResponse;
import com.votogether.domain.post.dto.response.detail.PostDetailResponse;
import com.votogether.domain.post.dto.response.vote.VoteOptionStatisticsResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostClosingType;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.entity.PostSortType;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.repository.PostOptionRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.post.util.ImageUploader;
import com.votogether.domain.vote.dto.VoteStatus;
import com.votogether.domain.vote.repository.VoteRepository;
import com.votogether.exception.BadRequestException;
import com.votogether.exception.NotFoundException;
import java.time.LocalDateTime;
import java.util.EnumMap;
import java.util.HashMap;
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

    private final Map<PostClosingType, Function<Pageable, Slice<Post>>> postClosingTypeMapper;
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

        this.postClosingTypeMapper = new EnumMap<>(PostClosingType.class);
        this.postsVotedByMemberMapper = new EnumMap<>(PostClosingType.class);
        initPostClosingTypeMapper();
        initPostsVotedByMemberMapper();
    }

    private void initPostClosingTypeMapper() {
        postClosingTypeMapper.put(PostClosingType.ALL, postRepository::findAll);
        postClosingTypeMapper.put(PostClosingType.PROGRESS, pageable ->
                postRepository.findByDeadlineAfter(LocalDateTime.now(), pageable));
        postClosingTypeMapper.put(PostClosingType.CLOSED, pageable ->
                postRepository.findByDeadlineBefore(LocalDateTime.now(), pageable));
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
                getPostOptionContents(postCreateRequest),
                uploadAndParseOptionImageUrls(optionImages)
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
                .postBody(toPostBody(postCreateRequest))
                .deadline(postCreateRequest.deadline())
                .build();
    }

    private PostBody toPostBody(final PostCreateRequest postCreateRequest) {
        return PostBody.builder()
                .title(postCreateRequest.title())
                .content(postCreateRequest.content())
                .build();
    }

    private List<String> getPostOptionContents(final PostCreateRequest postCreateRequest) {
        return postCreateRequest.postOptions().stream()
                .map(PostOptionCreateRequest::content)
                .toList();
    }

    private List<String> uploadAndParseOptionImageUrls(final List<MultipartFile> optionImages) {
        return optionImages.stream()
                .map(ImageUploader::upload)
                .toList();
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
    public List<PostResponse> getAllPostBySortTypeAndClosingType(
            final Member loginMember,
            final int page,
            final PostClosingType postClosingType,
            final PostSortType postSortType
    ) {
        final Pageable pageable = PageRequest.of(page, BASIC_PAGING_SIZE, postSortType.getPostBaseSort());
        final List<Post> contents = findContentsBySortTypeAndClosingType(postClosingType, pageable);

        return contents.stream()
                .map(post -> PostResponse.of(post, loginMember))
                .toList();
    }

    private List<Post> findContentsBySortTypeAndClosingType(
            final PostClosingType postClosingType,
            final Pageable pageable
    ) {
        return postClosingTypeMapper.get(postClosingType)
                .apply(pageable)
                .getContent();
    }

    @Transactional(readOnly = true)
    public PostDetailResponse getPostById(final Long postId, final Member loginMember) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_NOT_FOUND));

        post.validateWriter(loginMember);

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
                        status -> groupAgeRange(status.ageRange()),
                        HashMap::new,
                        Collectors.groupingBy(
                                VoteStatus::gender,
                                HashMap::new,
                                Collectors.summingLong(VoteStatus::count)
                        )
                ));
    }

    private String groupAgeRange(final String ageRange) {
        final List<String> teens = List.of("10~14", "15~19");
        final List<String> over60 = List.of("60~69", "70~79", "80~89", "90~");

        if (teens.contains(ageRange)) {
            return "10~19";
        }
        if (over60.contains(ageRange)) {
            return "60~";
        }
        return ageRange;
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

    public void closePostEarlyById(final Long id, final Member loginMember) {
        final Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글은 존재하지 않습니다."));

        post.validateWriter(loginMember);
        post.validateDeadLine();
        post.validateHalfDeadLine();
        post.closeEarly();
    }

}
