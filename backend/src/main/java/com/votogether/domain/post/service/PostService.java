package com.votogether.domain.post.service;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.category.repository.CategoryRepository;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.dto.request.post.PostCreateRequest;
import com.votogether.domain.post.dto.request.post.PostOptionCreateRequest;
import com.votogether.domain.post.dto.request.post.PostOptionUpdateRequest;
import com.votogether.domain.post.dto.request.post.PostUpdateRequest;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.NotFoundException;
import com.votogether.global.util.ImageUploader;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class PostService {

    private static final int MAXIMUM_DEADLINE = 3;

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;

    public PostService(
            final PostRepository postRepository,
            final CategoryRepository categoryRepository
    ) {
        this.postRepository = postRepository;
        this.categoryRepository = categoryRepository;
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
        post.addCategories(categories);
        addContentImageIfPresent(post, contentImages);

        return post;
    }

    private Post toPost(
            final PostCreateRequest postCreateRequest,
            final Member loginMember
    ) {
        return Post.builder()
                .writer(loginMember)
                .title(postCreateRequest.title())
                .content(postCreateRequest.content())
                .deadline(postCreateRequest.deadline())
                .build();
    }

    private PostBody toPostBody(final String title, final String content) {
        return new PostBody(title, content);
    }

    private void addContentImageIfPresent(final Post post, final List<MultipartFile> contentImages) {
        if (isContentImagesPresent(contentImages)) {
            post.addContentImage(ImageUploader.upload(contentImages.get(0)));
        }
    }

    private boolean isContentImagesPresent(final List<MultipartFile> contentImages) {
        return Objects.nonNull(contentImages) && !contentImages.isEmpty();
    }

    @Transactional
    public void closePostEarlyById(final Long id, final Member loginMember) {
        final Post post = postRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(PostExceptionType.POST_NOT_FOUND));

        post.validateWriter(loginMember);
        post.validateDeadLine();
        post.closeEarly();
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

}
