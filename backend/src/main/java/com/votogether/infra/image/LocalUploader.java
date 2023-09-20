package com.votogether.infra.image;

import com.votogether.global.exception.ImageException;
import java.io.File;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class LocalUploader implements ImageUploader {

    private static final String SLASH = File.separator;
    private static final String SYSTEM_PATH = System.getProperty("user.dir");

    private final String url;
    private final String uploadDirectory;

    public LocalUploader(
            @Value("${image.upload_url}") final String url,
            @Value("${image.upload_directory}") final String uploadDirectory
    ) {
        this.url = url;
        this.uploadDirectory = uploadDirectory;
    }

    public String upload(final MultipartFile image) {
        final File directory = loadDirectory(getImageStorePath());
        if (isEmptyImage(image)) {
            return null;
        }
        final String saveFileName = ImageName.from(image.getOriginalFilename());
        final File uploadPath = new File(directory, saveFileName);
        transferFile(image, uploadPath);
        return getImageFullPath(saveFileName);
    }

    private String getImageStorePath() {
        return SYSTEM_PATH + SLASH + uploadDirectory;
    }

    private File loadDirectory(final String directoryLocation) {
        final File directory = new File(directoryLocation);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        return directory;
    }

    private boolean isEmptyImage(final MultipartFile multipartFile) {
        return multipartFile == null || multipartFile.isEmpty();
    }

    private void transferFile(final MultipartFile file, final File uploadPath) {
        try {
            file.transferTo(uploadPath);
        } catch (IOException e) {
            throw new ImageException(ImageExceptionType.IMAGE_TRANSFER);
        }
    }

    private String getImageFullPath(final String fileName) {
        return url + SLASH + uploadDirectory + SLASH + fileName;
    }

    public void delete(final String path) {
        if (path == null || path.isEmpty()) {
            return;
        }
        final String deletePath = getImageLocalPath(path);
        final File file = new File(deletePath);
        deleteFile(file);
    }

    private String getImageLocalPath(final String fullPath) {
        final int urlIndex = fullPath.lastIndexOf(url);
        if (urlIndex == -1) {
            throw new ImageException(ImageExceptionType.IMAGE_URL);
        }
        final int urlNextIndex = urlIndex + url.length();
        return SYSTEM_PATH + fullPath.substring(urlNextIndex);
    }

    private void deleteFile(final File file) {
        if (file.exists()) {
            file.delete();
        }
    }

}
