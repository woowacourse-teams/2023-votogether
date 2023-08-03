package com.votogether.domain.post.util;

import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.exception.BadRequestException;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ImageUploader {

    public static String upload(final MultipartFile image) {
        final long milli = LocalDateTime.now().toInstant(ZoneOffset.UTC).toEpochMilli();

        final String absolutePath = new File("").getAbsolutePath();
        final String imageFolderPath = absolutePath + "/images/";
        final String imageUrl = imageFolderPath + milli + "_" + image.getOriginalFilename();

        try {
            File imageFolder = new File(imageFolderPath);
            if (!imageFolder.exists()) {
                imageFolder.mkdirs(); // Creates the directory if it does not exist
            }

            Files.write(Paths.get(imageUrl), image.getBytes());
        } catch (IOException ignore) {
            System.out.println("ImageUploader.upload");
            System.out.println("imageUrl = " + imageUrl);
            ignore.printStackTrace();
            throw new BadRequestException(PostExceptionType.WRONG_IMAGE);
        }

        return imageUrl;
    }

}
