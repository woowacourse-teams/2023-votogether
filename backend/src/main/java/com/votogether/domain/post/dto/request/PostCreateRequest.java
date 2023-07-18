package com.votogether.domain.post.dto.request;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostOption;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.IntStream;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

@Schema(name = "게시글 관련 데이터", description = "게시글에 관련한 데이터들입니다.")
@Getter
@ToString
@NoArgsConstructor
public class PostCreateRequest {

    private List<Long> categoryIds;
    private String title;
    private String content;
    private List<String> postOptionContents;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime deadline;

    @Builder
    public PostCreateRequest(
            final List<Long> categoryIds,
            final String title,
            final String content,
            final List<String> postOptionContents,
            final LocalDateTime deadline
    ) {
        this.categoryIds = categoryIds;
        this.title = title;
        this.content = content;
        this.postOptionContents = postOptionContents;
        this.deadline = deadline;
    }

    public Post toEntity(
            final Member member,
            final List<MultipartFile> images,
            final List<Category> categories
    ) {
        final Post post = Post.builder()
                .member(member)
                .postBody(createPostBody())
                .deadline(this.deadline)
                .build();

        post.addAllPostOptions(toPostOptionEntities(post, images));
        post.mapCategories(categories);

        return post;
    }

    private PostBody createPostBody() {
        return PostBody.builder()
                .title(this.title)
                .content(this.content)
                .build();
    }

    private List<PostOption> toPostOptionEntities(final Post post, final List<MultipartFile> images) {
        return IntStream.range(0, this.postOptionContents.size())
                .mapToObj(postOptionIndex -> toPostOption(post, postOptionIndex, images))
                .toList();
    }

    private PostOption toPostOption(
            final Post post,
            final int postOptionIndex,
            final List<MultipartFile> images
    ) {
        final String postOptionContent = this.postOptionContents.get(postOptionIndex);
        final MultipartFile image = images.get(postOptionIndex);
        return parsePostOption(post, postOptionIndex, postOptionContent, image);
    }

    private PostOption parsePostOption(
            final Post post,
            final int postOptionSequence,
            final String postOptionContent,
            final MultipartFile image
    ) {
        if (!image.isEmpty()) {
            final String absolutePath = new File("").getAbsolutePath();
            final String imageUrl = absolutePath + "/src/main/resources/images/" + image.getOriginalFilename();

            try {
                Files.write(Paths.get(imageUrl), image.getBytes());
            } catch (IOException ignore) { }

            return createPostOption(post, postOptionSequence, postOptionContent, imageUrl);
        }

        return createPostOption(post, postOptionSequence, postOptionContent, "");
    }

    private PostOption createPostOption(
            final Post post,
            final int postOptionSequence,
            final String postOptionContent,
            final String imageUrl
    ) {
        return PostOption.builder()
                .post(post)
                .sequence(postOptionSequence)
                .content(postOptionContent)
                .imageUrl(imageUrl)
                .build();
    }

}
