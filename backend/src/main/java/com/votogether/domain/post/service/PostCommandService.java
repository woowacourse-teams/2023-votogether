package com.votogether.domain.post.service;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.post.PostCreateRequest;
import com.votogether.domain.post.dto.request.post.PostOptionCreateRequest;
import com.votogether.domain.post.dto.request.post.PostOptionUpdateRequest;
import com.votogether.domain.post.dto.request.post.PostUpdateRequest;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostCategory;
import com.votogether.domain.post.entity.PostContentImage;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.repository.CommentRepository;
import com.votogether.domain.post.repository.PostCategoryRepository;
import com.votogether.domain.post.repository.PostContentImageRepository;
import com.votogether.domain.post.repository.PostOptionRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.vote.repository.VoteRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import com.votogether.infra.image.ImageUploader;
import java.util.List;
import java.util.Objects;
import java.util.stream.IntStream;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class PostCommandService {

    private final ImageUploader imageUploader;
    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;
    private final PostCategoryRepository postCategoryRepository;
    private final PostContentImageRepository postContentImageRepository;
    private final PostOptionRepository postOptionRepository;
    private final VoteRepository voteRepository;
    private final CommentRepository commentRepository;

    @Transactional
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
                .mapToObj(index -> createPostOptionFromRequest(index, postOptionsCreates.get(index)))
                .forEach(post::addPostOption);
    }

    private PostOption createPostOptionFromRequest(int index, final PostOptionCreateRequest postOptionCreate) {
        final String imageUrl = imageUploader.upload(postOptionCreate.getOptionImage());
        return PostOption.builder()
                .sequence(index + 1)
                .content(postOptionCreate.getContent())
                .imageUrl(imageUrl)
                .build();
    }

    @Transactional
    public void updatePost(
            final Long postId,
            final PostUpdateRequest postUpdate,
            final Member loginMember
    ) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_NOT_FOUND));
        validateHiddenPost(post);
        validatePostWriter(post, loginMember);

        updatePostOptions(post, postUpdate.getPostOptions());
        updatePost(post, postUpdate);
    }

    private void updatePostOptions(final Post post, final List<PostOptionUpdateRequest> postOptionUpdates) {
        final List<PostOption> postOptions = post.getPostOptions();
        final int postOptionSize = postOptions.size();
        final int updateSize = postOptionUpdates.size();

        if (postOptionSize > updateSize) {
            handlePostOptionMoreOriginsThanUpdates(post, postOptions, postOptionUpdates, updateSize);
        } else if (postOptionSize < updateSize) {
            handleMoreUpdatesThanOrigins(post, postOptions, postOptionUpdates, postOptionSize);
        } else {
            updateOriginPostOptions(postOptions, postOptionUpdates);
        }
    }

    private void handlePostOptionMoreOriginsThanUpdates(
            final Post post,
            final List<PostOption> postOptions,
            final List<PostOptionUpdateRequest> updates,
            final int updateSize
    ) {
        updateOriginPostOptions(postOptions.subList(0, updateSize), updates);
        removeOriginPostOptions(post, postOptions.subList(updateSize, postOptions.size()));
    }

    private void handleMoreUpdatesThanOrigins(
            final Post post,
            final List<PostOption> postOptions,
            final List<PostOptionUpdateRequest> updates,
            final int originSize
    ) {
        updateOriginPostOptions(postOptions, updates.subList(0, originSize));
        addNewPostOptions(post, updates.subList(originSize, updates.size()), originSize);
    }

    private void updateOriginPostOptions(
            final List<PostOption> postOptions,
            final List<PostOptionUpdateRequest> postOptionUpdates
    ) {
        for (int index = 0; index < postOptions.size(); index++) {
            updatePostOption(postOptions.get(index), postOptionUpdates.get(index));
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

    private void removeOriginPostOptions(final Post post, final List<PostOption> postOptions) {
        for (final PostOption postOption : postOptions) {
            imageUploader.delete(postOption.getImageUrl());
            post.removePostOption(postOption);
        }
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
        final List<PostCategory> postCategories = post.getPostCategories();
        final int postCategorySize = postCategories.size();
        final int updateSize = categoryIds.size();

        if (postCategorySize > updateSize) {
            handlePostCategoryMoreOriginsThanUpdates(post, postCategories, categoryIds, updateSize);
        } else if (postCategorySize < updateSize) {
            handlePostCategoryMoreUpdatesThanOrigins(post, postCategories, categoryIds, postCategorySize);
        } else {
            updateOriginPostCategories(postCategories, categoryIds);
        }
    }

    private void handlePostCategoryMoreOriginsThanUpdates(
            final Post post,
            final List<PostCategory> postCategories,
            final List<Long> categoryIds,
            final int updateSize
    ) {
        updateOriginPostCategories(postCategories.subList(0, updateSize), categoryIds);
        removeOriginPostCategories(post, postCategories.subList(updateSize, postCategories.size()));
    }

    private void handlePostCategoryMoreUpdatesThanOrigins(
            final Post post,
            final List<PostCategory> postCategories,
            final List<Long> categoryIds,
            final int originSize
    ) {
        updateOriginPostCategories(postCategories, categoryIds.subList(0, originSize));
        addCategories(post, categoryIds.subList(originSize, categoryIds.size()));
    }

    private void updateOriginPostCategories(final List<PostCategory> postCategories, final List<Long> categoryIds) {
        final List<Category> categories = categoryRepository.findAllById(categoryIds);
        IntStream.range(0, categories.size())
                .forEach(index -> postCategories.get(index).updateCategory(categories.get(index)));
    }

    private void removeOriginPostCategories(final Post post, final List<PostCategory> postCategories) {
        for (final PostCategory postCategory : postCategories) {
            post.removePostCategory(postCategory);
        }
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
        } else {
            updateExistingPostContentImage(post, postContentImage, updatedImageUrl);
        }
    }

    private void updateExistingPostContentImage(
            final Post post,
            final PostContentImage postContentImage,
            final String updatedImageUrl
    ) {
        if (updatedImageUrl == null) {
            post.removePostContentImage(postContentImage);
        } else {
            postContentImage.updateImageUrl(updatedImageUrl);
        }
    }

    private String updateImage(
            final String originImageUrl,
            final String clientUrl,
            final MultipartFile multipartFile
    ) {
        final boolean hasOriginImage = Objects.nonNull(originImageUrl);
        final boolean hasClientUrl = Objects.nonNull(clientUrl);
        final boolean hasNewImage = multipartFile != null && !multipartFile.isEmpty();

        if (hasOriginImage && (!hasClientUrl || hasNewImage)) {
            imageUploader.delete(originImageUrl);
        }
        if (hasNewImage) {
            return imageUploader.upload(multipartFile);
        }
        if (hasOriginImage && hasClientUrl && !hasNewImage) {
            return originImageUrl;
        }
        return null;
    }

    @Transactional
    public void closePostEarly(final Long postId, final Member loginMember) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_NOT_FOUND));
        validateHiddenPost(post);
        validatePostWriter(post, loginMember);
        post.closeEarly();
    }

    @Transactional
    public void deletePost(final Long postId, final Member loginMember) {
        final Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_NOT_FOUND));
        validateHiddenPost(post);
        validatePostWriter(post, loginMember);
        validatePostDeletePossible(post);

        deleteVotes(post.getPostOptions());
        deletePostOptions(postId, post.getPostOptions());
        deleteComments(postId);
        deletePost(postId, post.getPostContentImages());
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

    private void deletePost(final Long postId, final List<PostContentImage> postContentImages) {
        postCategoryRepository.deleteAllWithPostIdInBatch(postId);
        postContentImages.stream()
                .map(PostContentImage::getImageUrl)
                .forEach(imageUploader::delete);
        postContentImageRepository.deleteAllWithPostIdInBatch(postId);
        postRepository.deleteById(postId);
    }

    private void validateHiddenPost(final Post post) {
        if (post.isHidden()) {
            throw new BadRequestException(PostExceptionType.POST_IS_HIDDEN);
        }
    }

    private void validatePostWriter(final Post post, final Member member) {
        if (!post.isWriter(member)) {
            throw new BadRequestException(PostExceptionType.POST_NOT_WRITER);
        }
    }

    private void validatePostDeletePossible(final Post post) {
        if (!post.canDelete()) {
            throw new BadRequestException(PostExceptionType.FAIL_DELETE_EXCEED);
        }
    }

}
