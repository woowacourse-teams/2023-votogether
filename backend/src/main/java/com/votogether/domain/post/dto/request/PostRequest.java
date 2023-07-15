package com.votogether.domain.post.dto.request;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostBody;
import com.votogether.domain.post.entity.PostOption;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.IntStream;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

@Schema(name = "게시글 관련 데이터", description = "게시글에 관련한 데이터들입니다.")
@Getter
@ToString
@NoArgsConstructor
public class PostRequest {

    private List<Long> categoryIds;
    private String title;
    private String content;
    private List<PostOptionRequest> postOptionRequests;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime deadline;

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
        return IntStream.range(0, this.postOptionRequests.size())
                .mapToObj(postOptionIndex -> toPostOptionEntity(post, postOptionIndex, images))
                .toList();
    }

    private PostOption toPostOptionEntity(
            final Post post,
            final int postOptionIndex,
            final List<MultipartFile> images
    ) {
        final PostOptionRequest postOptionRequest = this.postOptionRequests.get(postOptionIndex);
        return postOptionRequest.toEntity(post, postOptionIndex, images.get(postOptionIndex));
    }

}
