package com.votogether.domain.post.service;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.dto.request.CreatePostRequest;
import com.votogether.domain.post.dto.response.GetAllPostResponse;
import com.votogether.domain.post.dto.response.VoteOptionStatisticsResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostClosingType;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.entity.PostSortType;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.repository.PostOptionRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.vote.dto.VoteStatus;
import com.votogether.domain.vote.repository.VoteRepository;
import com.votogether.exception.BadRequestException;
import com.votogether.exception.NotFoundException;
import java.time.LocalDateTime;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    private final Map<PostClosingType, Function<Pageable, Slice<Post>>> postClosingTypeMapper;

    private final PostRepository postRepository;
    private final PostOptionRepository postOptionRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;
    private final VoteRepository voteRepository;

    public PostService(
            final PostRepository postRepository,
            final PostOptionRepository postOptionRepository,
            final CategoryRepository categoryRepository,
            final MemberRepository memberRepository,
            final VoteRepository voteRepository
    ) {
        this.postRepository = postRepository;
        this.postOptionRepository = postOptionRepository;
        this.categoryRepository = categoryRepository;
        this.memberRepository = memberRepository;
        this.voteRepository = voteRepository;

        this.postClosingTypeMapper = new EnumMap<>(PostClosingType.class);
        initPostClosingTypeMapper();
    }

    private void initPostClosingTypeMapper() {
        postClosingTypeMapper.put(PostClosingType.ALL, postRepository::findAll);
        postClosingTypeMapper.put(PostClosingType.PROGRESS, pageable ->
                postRepository.findByDeadlineAfter(LocalDateTime.now(), pageable));
        postClosingTypeMapper.put(PostClosingType.CLOSED, pageable ->
                postRepository.findByDeadlineBefore(LocalDateTime.now(), pageable));
    }

    @Transactional
    public Long save(
            final CreatePostRequest createPostRequest,
            final Member member,
            final List<MultipartFile> images
    ) {
        final List<Category> categories = categoryRepository.findAllById(createPostRequest.categoryIds());
        final Post post = toPostEntity(createPostRequest, member, images, categories);

        // TODO : 일단 돌아가게 하기 위한 member 저장 (실제 어플에선 삭제될 코드)
        memberRepository.save(member);
        return postRepository.save(post).getId();
    }

    private Post toPostEntity(
            final CreatePostRequest createPostRequest,
            final Member member,
            final List<MultipartFile> images,
            final List<Category> categories
    ) {
        final Post post = toPost(createPostRequest, member);

        final List<String> postOptionContents = createPostRequest.postOptionContents();
        post.mapPostOptionsByElements(postOptionContents, post, images);
        post.mapCategories(categories);

        return post;
    }

    private Post toPost(final CreatePostRequest createPostRequest, final Member member) {
        return Post.builder()
                .member(member)
                .postBody(toPostBody(createPostRequest))
                .deadline(createPostRequest.deadline())
                .build();
    }

    private PostBody toPostBody(final CreatePostRequest createPostRequest) {
        return PostBody.builder()
                .title(createPostRequest.title())
                .content(createPostRequest.content())
                .build();
    }

    public List<GetAllPostResponse> getAllPostBySortTypeAndClosingType(
            final Integer page,
            final PostClosingType postClosingType,
            final PostSortType postSortType
    ) {
        final Pageable pageable = PageRequest.of(page, 10, postSortType.getSort());
        final List<Post> contents = findContentsBySortTypeAndClosingType(postClosingType, pageable);

        return contents.stream()
                .map(GetAllPostResponse::new)
                .toList();
    }

    private List<Post> findContentsBySortTypeAndClosingType(final PostClosingType postClosingType, final Pageable pageable) {
        return postClosingTypeMapper.get(postClosingType)
                .apply(pageable)
                .getContent();
    }

    @Transactional(readOnly = true)
    public VoteOptionStatisticsResponse getVoteOptionStatistics(final Long postId, final Long optionId) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_NOT_FOUND));
        final PostOption postOption = postOptionRepository.findById(optionId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_OPTION_NOT_FOUND));

        if (!postOption.isBelongsTo(post)) {
            throw new BadRequestException(PostExceptionType.UNRELATED_POST_OPTION);
        }

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

}
