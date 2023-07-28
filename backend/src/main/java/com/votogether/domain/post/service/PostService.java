package com.votogether.domain.post.service;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Gender;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.repository.MemberRepository;
import com.votogether.domain.post.dto.request.PostCreateRequest;
import com.votogether.domain.post.dto.response.VoteOptionStatisticsResponse;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.repository.PostOptionRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.vote.dto.VoteStatus;
import com.votogether.domain.vote.repository.VoteRepository;
import com.votogether.exception.BadRequestException;
import com.votogether.exception.NotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;
    private final PostOptionRepository postOptionRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;
    private final VoteRepository voteRepository;

    @Transactional
    public Long save(
            final PostCreateRequest postCreateRequest,
            final Member member,
            final List<MultipartFile> images
    ) {
        final List<Category> categories = categoryRepository.findAllById(postCreateRequest.categoryIds());
        final Post post = toPostEntity(postCreateRequest, member, images, categories);

        // TODO : 일단 돌아가게 하기 위한 member 저장 (실제 어플에선 삭제될 코드)
        memberRepository.save(member);
        return postRepository.save(post).getId();
    }

    private Post toPostEntity(
            final PostCreateRequest postCreateRequest,
            final Member member,
            final List<MultipartFile> images,
            final List<Category> categories
    ) {
        final Post post = Post.builder()
                .member(member)
                .postBody(toPostBody(postCreateRequest))
                .deadline(postCreateRequest.deadline())
                .build();

        final List<String> postOptionContents = postCreateRequest.postOptionContents();
        post.mapPostOptionsByElements(postOptionContents, post, images);
        post.mapCategories(categories);

        return post;
    }

    private PostBody toPostBody(final PostCreateRequest postCreateRequest) {
        return PostBody.builder()
                .title(postCreateRequest.title())
                .content(postCreateRequest.content())
                .build();
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

    @Transactional
    public void postClosedEarlyById(final Long id) {
        final Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글은 존재하지 않습니다."));

        post.closedEarly();
    }

}
