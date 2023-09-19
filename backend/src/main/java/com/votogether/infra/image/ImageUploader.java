package com.votogether.infra.image;

import org.springframework.web.multipart.MultipartFile;

public interface ImageUploader {

    String upload(final MultipartFile image);

    void delete(final String path);

}
