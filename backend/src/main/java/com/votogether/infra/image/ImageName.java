package com.votogether.infra.image;

import com.votogether.global.exception.ImageException;
import java.util.Set;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.util.StringUtils;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ImageName {

    private static final String DOT = ".";
    private static final String UNDER_BAR = "_";
    private static final Set<String> IMAGE_EXTENSIONS = Set.of("jpeg", "jpg", "png", "webp", "heic", "heif");

    public static String from(final String originalFilename) {
        final String extension = StringUtils.getFilenameExtension(originalFilename);
        validateFileName(originalFilename);
        validateExtension(extension);
        final String fileBaseName = UUID.randomUUID().toString().substring(0, 8);
        return fileBaseName + UNDER_BAR + System.currentTimeMillis() + DOT + extension;
    }

    private static void validateFileName(final String fileName) {
        if (fileName == null || fileName.isBlank()) {
            throw new ImageException(ImageExceptionType.IMAGE_NAME_BLANK);
        }
    }

    private static void validateExtension(final String extension) {
        if (extension == null) {
            throw new ImageException(ImageExceptionType.IMAGE_FORMAT);
        }
        if (!IMAGE_EXTENSIONS.contains(extension.toLowerCase())) {
            throw new ImageException(ImageExceptionType.IMAGE_EXTENSION);
        }
    }

}
