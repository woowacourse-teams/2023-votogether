package com.votogether.domain.post.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Embeddable;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Embeddable
public class PostContentImages {

    @OneToMany(mappedBy = "post", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<PostContentImage> contentImages = new ArrayList<>();

    public void addContentImage(final Post post, final String contentImageUrl) {
        this.contentImages.add(getPostContentImage(post, contentImageUrl));
    }

    private PostContentImage getPostContentImage(final Post post, final String contentImageUrl) {
        return PostContentImage.builder()
                .post(post)
                .imageUrl(contentImageUrl)
                .build();
    }

}
