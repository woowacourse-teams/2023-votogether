package com.votogether.domain.post.dto.request;

import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PostOptionRequest {

    private String content;

    public PostOption toEntity(
            final Post post,
            final int postOptionSequence,
            final MultipartFile image
    ) {
        if (!image.isEmpty()) {
            final String absolutePath = new File("").getAbsolutePath();
            final String imageUrl = absolutePath + "/src/main/resources/images/" + image.getOriginalFilename();

            try {
                Files.write(Paths.get(imageUrl), image.getBytes());
            } catch (IOException ignore) {
            }

            return getPostOption(post, postOptionSequence, imageUrl);
        }

        return getPostOption(post, postOptionSequence, "");
    }

    private PostOption getPostOption(
            final Post post,
            final int postOptionSequence,
            final String imageUrl
    ) {
        return PostOption.builder()
                .sequence(postOptionSequence)
                .post(post)
                .content(content)
                .imageUrl(imageUrl)
                .build();
    }

}
