package com.votogether.domain.post.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Embeddable
public class PostBody {

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 1000, nullable = false)
    private String content;

    @Embedded
    private PostContentImages postContentImages;

    @Builder
    private PostBody(final String title, final String content) {
        this.title = title;
        this.content = content;
        this.postContentImages = new PostContentImages();
    }

    public void update(
            final PostBody postBody,
            final String oldContentImageUrl,
            final List<String> contentImageUrls
    ) {
        this.title = postBody.getTitle();
        this.content = postBody.getContent();
        this.postContentImages.update(getContentImageUrl(oldContentImageUrl, contentImageUrls));
    }

    private String getContentImageUrl(
            final String oldContentImageUrl,
            final List<String> contentImageUrls
    ) {
        if (contentImageUrls.isEmpty()) {
            return oldContentImageUrl;
        }

        return contentImageUrls.get(0);
    }

    public void addContentImage(final Post post, final String contentImageUrl) {
        this.postContentImages.addContentImage(post, contentImageUrl);
    }

}
