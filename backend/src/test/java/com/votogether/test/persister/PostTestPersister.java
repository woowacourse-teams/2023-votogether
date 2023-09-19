package com.votogether.test.persister;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostCategory;
import com.votogether.domain.post.entity.PostContentImage;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.repository.PostCategoryRepository;
import com.votogether.domain.post.repository.PostContentImageRepository;
import com.votogether.domain.post.repository.PostOptionRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.domain.post.service.PostService;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Persister
public class PostTestPersister {

    private final PostRepository postRepository;
    private final PostCategoryRepository postCategoryRepository;
    private final PostContentImageRepository postContentImageRepository;
    private final PostOptionRepository postOptionRepository;
    private final MemberTestPersister memberTestPersister;
    private final CategoryTestPersister categoryTestPersister;

    public PostBuilder postBuilder() {
        return new PostBuilder();
    }

    public PostCategoryBuilder postCategoryBuilder() {
        return new PostCategoryBuilder();
    }

    public PostContentImageBuilder postContentImageBuilder() {
        return new PostContentImageBuilder();
    }

    public PostOptionBuilder postOptionBuilder() {
        return new PostOptionBuilder();
    }

    public final class PostBuilder {

        private Member writer;
        private String title;
        private String content;
        private LocalDateTime deadline;
        private boolean isHidden;

        public PostBuilder writer(Member writer) {
            this.writer = writer;
            return this;
        }

        public PostBuilder title(String title) {
            this.title = title;
            return this;
        }

        public PostBuilder content(String content) {
            this.content = content;
            return this;
        }

        public PostBuilder deadline(LocalDateTime deadline) {
            this.deadline = deadline;
            return this;
        }

        public PostBuilder blind() {
            this.isHidden = true;
            return this;
        }

        public Post save() {
            Post post = Post.builder()
                    .writer(writer == null ? memberTestPersister.builder().save() : writer)
                    .title(title == null ? "title" : title)
                    .content(content == null ? "content" : content)
                    .deadline(deadline == null ? LocalDateTime.now().plusDays(14) : deadline)
                    .build();
            if (isHidden) {
                post.blind();
            }

            return postRepository.save(post);
        }

    }

    public final class PostCategoryBuilder {

        private Post post;
        private Category category;

        public PostCategoryBuilder post(Post post) {
            this.post = post;
            return this;
        }

        public PostCategoryBuilder category(Category category) {
            this.category = category;
            return this;
        }

        public PostCategory save() {
            PostCategory postCategory = PostCategory.builder()
                    .post(post == null ? postBuilder().save() : post)
                    .category(category == null ? categoryTestPersister.builder().save() : category)
                    .build();
            return postCategoryRepository.save(postCategory);
        }

    }

    public final class PostContentImageBuilder {

        private Post post;
        private String imageUrl;

        public PostContentImageBuilder post(Post post) {
            this.post = post;
            return this;
        }

        public PostContentImageBuilder imageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }

        public PostContentImage save() {
            PostContentImage postContentImage = PostContentImage.builder()
                    .post(post == null ? postBuilder().save() : post)
                    .imageUrl(imageUrl == null ? "image.png" : imageUrl)
                    .build();
            return postContentImageRepository.save(postContentImage);
        }

    }

    public final class PostOptionBuilder {

        private Post post;
        private int sequence;
        private String content;
        private String imageUrl;

        public PostOptionBuilder post(Post post) {
            this.post = post;
            return this;
        }

        public PostOptionBuilder sequence(int sequence) {
            this.sequence = sequence;
            return this;
        }

        public PostOptionBuilder content(String content) {
            this.content = content;
            return this;
        }

        public PostOptionBuilder imageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }

        public PostOption save() {
            PostOption postOption = PostOption.builder()
                    .post(post == null ? postBuilder().save() : post)
                    .sequence(sequence)
                    .content(content == null ? "content" : content)
                    .imageUrl(imageUrl)
                    .build();
            return postOptionRepository.save(postOption);
        }
    }

}
