package com.votogether.global.util;

import com.votogether.domain.post.exception.PostExceptionType;
import com.votogether.global.exception.BadRequestException;
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
        if (image.getOriginalFilename().contains("없는사진")) {
            return "";
        }

        final long milli = LocalDateTime.now().toInstant(ZoneOffset.UTC).toEpochMilli();
        final String rootPath = new File("").getAbsolutePath() + File.separator;
        final String imageDirPath = "static" + File.separator + "images" + File.separator;
        final String imageFileName = milli + "_" + image.getOriginalFilename();

        try {
            File imageFolder = new File(rootPath + imageDirPath);
            if (!imageFolder.exists()) {
                imageFolder.mkdirs(); // Creates the directory if it does not exist
            }
            Files.write(Paths.get(rootPath + imageDirPath + imageFileName), image.getBytes());
        } catch (IOException ignore) {
            throw new BadRequestException(PostExceptionType.WRONG_IMAGE);
        }
        return imageDirPath + imageFileName;
    }

}
