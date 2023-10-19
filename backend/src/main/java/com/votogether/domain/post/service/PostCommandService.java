package com.votogether.domain.post.service;

import com.votogether.domain.alarm.dto.event.PostAlarmEvent;
import com.votogether.domain.alarm.entity.vo.AlarmType;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.MemberMetric;
import com.votogether.domain.member.exception.MemberExceptionType;
import com.votogether.domain.member.repository.MemberMetricRepository;
import com.votogether.domain.post.dto.request.post.PostCreateRequest;
import com.votogether.domain.post.dto.request.post.PostOptionCreateRequest;
import com.votogether.domain.post.dto.request.post.PostOptionUpdateRequest;
import com.votogether.domain.post.dto.request.post.PostUpdateRequest;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostContentImage;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.exception.PostOptionExceptionType;
import com.votogether.domain.post.repository.CommentRepository;
import com.votogether.domain.post.repository.PostCategoryRepository;
import com.votogether.domain.post.repository.PostContentImageRepository;
import com.votogether.domain.post.repository.PostOptionRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.report.entity.vo.ReportType;
import com.votogether.domain.report.repository.ReportRepository;
import com.votogether.domain.vote.repository.VoteRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import com.votogether.infra.image.ImageUploader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Transactional
@Service
public class PostCommandService {

    private static final String NICKNAME_WHEN_POST_CLOSING = "";

    private final ImageUploader imageUploader;
    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;
    private final PostCategoryRepository postCategoryRepository;
    private final PostContentImageRepository postContentImageRepository;
    private final PostOptionRepository postOptionRepository;
    private final VoteRepository voteRepository;
    private final CommentRepository commentRepository;
    private final ReportRepository reportRepository;
    private final MemberMetricRepository memberMetricRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

    public Long createPost(final PostCreateRequest postCreate, final Member loginMember) {
        final Post post = Post.builder()
                .writer(loginMember)
                .title(postCreate.getTitle())
                .content(postCreate.getContent())
                .deadline(postCreate.getDeadline())
                .build();

        addCategories(post, postCreate.getCategoryIds());
        addImage(post, postCreate.getImageFile());
        addPostOptions(post, postCreate.getPostOptions());

        final MemberMetric memberMetric = memberMetricRepository.findByMemberIdForUpdate(loginMember.getId())
                .orElseThrow(() -> new NotFoundException(MemberExceptionType.NOT_FOUND_METRIC));

        memberMetric.increasePostCount();
        return postRepository.save(post).getId();
    }

    private void addCategories(final Post post, final List<Long> categoryIds) {
        categoryRepository.findAllById(categoryIds).forEach(post::addCategory);
    }

    private void addImage(final Post post, final MultipartFile multipartFile) {
        final String imageUrl = imageUploader.upload(multipartFile);
        if (Objects.nonNull(imageUrl)) {
            post.addContentImage(imageUrl);
        }
    }

    private void addPostOptions(final Post post, final List<PostOptionCreateRequest> postOptionsCreates) {
        IntStream.range(0, postOptionsCreates.size())
                .mapToObj(index -> createPostOptionFromRequest(index + 1, postOptionsCreates.get(index)))
                .forEach(post::addPostOption);
    }

    private PostOption createPostOptionFromRequest(int sequence, final PostOptionCreateRequest postOptionCreate) {
        final String imageUrl = imageUploader.upload(postOptionCreate.getImageFile());
        return PostOption.builder()
                .sequence(sequence)
                .content(postOptionCreate.getContent())
                .imageUrl(imageUrl)
                .build();
    }

    public void updatePost(
            final Long postId,
            final PostUpdateRequest postUpdate,
            final Member loginMember
    ) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.NOT_FOUND));
        validateHiddenPost(post);
        validatePostWriter(post, loginMember);
        validatePostOptionUpdateCount(post, postUpdate);

        updatePostOptions(post, postUpdate.getPostOptions());
        updatePost(post, postUpdate);
    }

    private void updatePostOptions(final Post post, final List<PostOptionUpdateRequest> postOptionUpdates) {
        final List<PostOption> postOptions = new ArrayList<>(post.getPostOptions());
        final Set<Long> postOptionIds = postOptions.stream()
                .map(PostOption::getId)
                .collect(Collectors.toSet());
        final List<PostOption> removePostOptions = extractPostOptionRemoves(postOptions, postOptionUpdates);
        final Map<Long, PostOptionUpdateRequest> updateOptionGroup =
                extractPostOptionUpdates(postOptionIds, postOptionUpdates);
        final List<PostOptionUpdateRequest> addPostOptions =
                extractPostOptionAdds(postOptionIds, postOptionUpdates);

        removeOriginPostOptions(post, removePostOptions);
        updateOriginPostOptions(post, updateOptionGroup);
        addNewPostOptions(post, addPostOptions, post.getPostOptions().size());
    }

    private List<PostOption> extractPostOptionRemoves(
            final List<PostOption> postOptions,
            final List<PostOptionUpdateRequest> postOptionUpdates
    ) {
        final Set<Long> updateOptionIds = postOptionUpdates.stream()
                .map(PostOptionUpdateRequest::getId)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());
        return postOptions.stream()
                .filter(postOption -> !updateOptionIds.contains(postOption.getId()))
                .toList();
    }

    private Map<Long, PostOptionUpdateRequest> extractPostOptionUpdates(
            final Set<Long> postOptionIds,
            final List<PostOptionUpdateRequest> postOptionUpdates
    ) {
        return postOptionUpdates.stream()
                .filter(postOptionUpdate ->
                        Objects.nonNull(postOptionUpdate.getId()) && postOptionIds.contains(postOptionUpdate.getId()))
                .collect(Collectors.toMap(
                        PostOptionUpdateRequest::getId,
                        postOptionUpdate -> postOptionUpdate,
                        (exist, replace) -> {
                            throw new BadRequestException(PostOptionExceptionType.DUPLICATE_UPDATE);
                        },
                        HashMap::new
                ));
    }

    private List<PostOptionUpdateRequest> extractPostOptionAdds(
            final Set<Long> postOptionIds,
            final List<PostOptionUpdateRequest> postOptionUpdates
    ) {
        validatePostOptionIds(postOptionIds, postOptionUpdates);

        return postOptionUpdates.stream()
                .filter(postOptionUpdate -> postOptionUpdate.getId() == null)
                .toList();
    }

    private static void validatePostOptionIds(
            final Set<Long> postOptionIds,
            final List<PostOptionUpdateRequest> postOptionUpdates
    ) {
        postOptionUpdates.stream()
                .map(PostOptionUpdateRequest::getId)
                .filter(Objects::nonNull)
                .filter(id -> !postOptionIds.contains(id))
                .findFirst()
                .ifPresent(id -> {
                    throw new BadRequestException(PostOptionExceptionType.UNRELATED_POST);
                });
    }

    private void removeOriginPostOptions(final Post post, final List<PostOption> removePostOptions) {
        for (final PostOption postOption : removePostOptions) {
            imageUploader.delete(postOption.getImageUrl());
            post.removePostOption(postOption);
        }
        postOptionRepository.flush();
    }

    private void updateOriginPostOptions(final Post post, final Map<Long, PostOptionUpdateRequest> updateOptionGroup) {
        final List<PostOption> postOptions = post.getPostOptions();
        for (final PostOption postOption : postOptions) {
            updatePostOption(postOption, updateOptionGroup.get(postOption.getId()));
        }
        for (int i = 0; i < postOptions.size(); i++) {
            postOptions.get(i).setSequence(i + 1);
        }
    }

    private void updatePostOption(final PostOption postOption, final PostOptionUpdateRequest postOptionUpdate) {
        final String imageUrl = updateImage(
                postOption.getImageUrl(),
                postOptionUpdate.getImageUrl(),
                postOptionUpdate.getImageFile()
        );
        postOption.update(postOptionUpdate.getContent(), imageUrl);
    }

    private String updateImage(
            final String originImageUrl,
            final String clientUrl,
            final MultipartFile multipartFile
    ) {
        final boolean hasOriginImage = Objects.nonNull(originImageUrl);
        final boolean hasClientUrl = Objects.nonNull(clientUrl) && !clientUrl.isBlank();
        final boolean hasNewImage = multipartFile != null && !multipartFile.isEmpty();

        if (hasOriginImage && (!hasClientUrl || hasNewImage)) {
            imageUploader.delete(originImageUrl);
        }
        if (hasNewImage) {
            return imageUploader.upload(multipartFile);
        }
        if (hasOriginImage && hasClientUrl) {
            return originImageUrl;
        }
        return null;
    }

    private void addNewPostOptions(
            final Post post,
            final List<PostOptionUpdateRequest> postOptionUpdates,
            final int prevPostOptionSize
    ) {
        IntStream.range(0, postOptionUpdates.size())
                .mapToObj(index -> createNewPostOption(index, postOptionUpdates.get(index), prevPostOptionSize))
                .forEach(post::addPostOption);
    }

    private PostOption createNewPostOption(
            final int index,
            final PostOptionUpdateRequest postOptionUpdate,
            final int prevPostOptionSize
    ) {
        final String imageUrl = imageUploader.upload(postOptionUpdate.getImageFile());
        return PostOption.builder()
                .sequence(index + 1 + prevPostOptionSize)
                .content(postOptionUpdate.getContent())
                .imageUrl(imageUrl)
                .build();
    }

    private void updatePost(final Post post, final PostUpdateRequest postUpdate) {
        updatePostCategories(post, postUpdate.getCategoryIds());
        updatePostContentImage(post, postUpdate.getImageUrl(), postUpdate.getImageFile());
        post.update(postUpdate.getTitle(), postUpdate.getContent(), postUpdate.getDeadline());
    }

    private void updatePostCategories(final Post post, final List<Long> categoryIds) {
        post.getPostCategories().clear();
        postCategoryRepository.flush();
        addCategories(post, categoryIds);
    }

    private void updatePostContentImage(
            final Post post,
            final String imageUrl,
            final MultipartFile multipartFile
    ) {
        final PostContentImage postContentImage = post.getFirstContentImage();
        final String currentImageUrl = postContentImage != null ? postContentImage.getImageUrl() : null;
        final String updatedImageUrl = updateImage(currentImageUrl, imageUrl, multipartFile);

        if (postContentImage == null && updatedImageUrl != null) {
            post.addContentImage(updatedImageUrl);
            return;
        }
        updateExistingPostContentImage(post, postContentImage, updatedImageUrl);
    }

    private void updateExistingPostContentImage(
            final Post post,
            final PostContentImage postContentImage,
            final String updatedImageUrl
    ) {
        if (updatedImageUrl == null) {
            post.removePostContentImage(postContentImage);
            return;
        }
        postContentImage.updateImageUrl(updatedImageUrl);
    }

    public void closePostEarly(final Long postId, final Member loginMember) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.NOT_FOUND));
        validateHiddenPost(post);
        validatePostWriter(post, loginMember);
        post.closeEarly();

        publishAlarmEvent(postId, loginMember, post);
    }

    private void publishAlarmEvent(final Long postId, final Member loginMember, final Post post) {
        final PostAlarmEvent postAlarmEvent = new PostAlarmEvent(
                loginMember,
                NICKNAME_WHEN_POST_CLOSING,
                postId,
                AlarmType.POST_DEADLINE,
                post.getTitle()
        );
        applicationEventPublisher.publishEvent(postAlarmEvent);
    }

    public void deletePost(final Long postId, final Member loginMember) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.NOT_FOUND));
        validateHiddenPost(post);
        validatePostWriter(post, loginMember);
        validatePostDeletePossible(post);

        final List<PostOption> postOptions = post.getPostOptions();
        final List<String> postContentImagePaths = post.getPostContentImages()
                .stream()
                .map(PostContentImage::getImageUrl)
                .toList();

        final MemberMetric memberMetric = memberMetricRepository.findByMemberIdForUpdate(loginMember.getId())
                .orElseThrow(() -> new NotFoundException(MemberExceptionType.NOT_FOUND_METRIC));

        memberMetric.decreasePostCount();
        deleteVotes(postOptions);
        deletePostOptions(postId, postOptions);
        deleteComments(postId);
        deletePost(postId, postContentImagePaths);
    }

    private void deleteVotes(final List<PostOption> postOptions) {
        final List<Long> postOptionIds = postOptions.stream()
                .map(PostOption::getId)
                .toList();
        voteRepository.deleteAllWithPostOptionIdsInBatch(postOptionIds);
    }

    private void deletePostOptions(final Long postId, final List<PostOption> postOptions) {
        postOptions.stream()
                .map(PostOption::getImageUrl)
                .forEach(imageUploader::delete);
        postOptionRepository.deleteAllWithPostIdInBatch(postId);
    }

    private void deleteComments(final Long postId) {
        commentRepository.deleteAllWithPostIdInBatch(postId);
    }

    private void deletePost(final Long postId, final List<String> postContentImagePaths) {
        postCategoryRepository.deleteAllWithPostIdInBatch(postId);
        postContentImagePaths.forEach(imageUploader::delete);
        postContentImageRepository.deleteAllWithPostIdInBatch(postId);
        reportRepository.deleteAllWithReportTypeAndTargetIdInBatch(ReportType.POST, postId);
        postRepository.deleteById(postId);
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

    private void validatePostOptionUpdateCount(final Post post, final PostUpdateRequest postUpdate) {
        if (!post.isLimitOptionSize(postUpdate.getPostOptions().size())) {
            throw new BadRequestException(PostOptionExceptionType.SIZE_EXCEED);
        }
    }

    private void validatePostDeletePossible(final Post post) {
        if (!post.canDelete()) {
            throw new BadRequestException(PostExceptionType.FAIL_DELETE_EXCEED);
        }
    }

}
