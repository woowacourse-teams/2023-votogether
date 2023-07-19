package com.votogether.domain.post.entity;

import com.votogether.domain.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class PostOption extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @Column(nullable = false)
    private Integer sequence;

    @Column(length = 50, nullable = false)
    private String content;

    @Column
    private String imageUrl;

    @Builder
    private PostOption(
            final Post post,
            final Integer sequence,
            final String content,
            final String imageUrl
    ) {
        this.post = post;
        this.sequence = sequence;
        this.content = content;
        this.imageUrl = imageUrl;
    }

    public static PostOption of(
            final String postOptionContent,
            final Post post,
            final int postOptionSequence,
            final MultipartFile image
    ) {
        if (!image.isEmpty()) {
            final String imageUrl = saveImageToPath(image);
            return toPostOptionEntity(post, postOptionSequence, postOptionContent, imageUrl);
        }

        return toPostOptionEntity(post, postOptionSequence, postOptionContent, "");
    }

    private static String saveImageToPath(final MultipartFile image) {
        final String absolutePath = new File("").getAbsolutePath();
        final String imageUrl = absolutePath + "/src/main/resources/images/" + image.getOriginalFilename();

        try {
            Files.write(Paths.get(imageUrl), image.getBytes());
        } catch (IOException ignore) {
        }
        return imageUrl;
    }

    private static PostOption toPostOptionEntity(
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

    public boolean isBelongsTo(final Post post) {
        return Objects.equals(this.post.getId(), post.getId());
    }

}
