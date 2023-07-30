package com.votogether.domain.post.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ImageUploader {

    public static String upload(final MultipartFile image) {
        final String absolutePath = new File("").getAbsolutePath();
        final String imageUrl = absolutePath + "/images/" + image.getOriginalFilename();

        try {
            Files.write(Paths.get(imageUrl), image.getBytes());
        } catch (IOException ignore) {
        }

        return imageUrl;
    }

}
