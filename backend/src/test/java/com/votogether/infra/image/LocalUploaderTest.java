package com.votogether.infra.image;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.votogether.global.exception.ImageException;
import com.votogether.test.ServiceTest;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

class LocalUploaderTest extends ServiceTest {

    @Autowired
    LocalUploader localUploader;

    @AfterEach
    void tearDown(
            @Value("${image.upload_directory}") String uploadDirectory
    ) {
        File folder = new File(uploadDirectory);
        if (folder.exists()) {
            deleteFileRecursive(folder);
        }
    }

    private static void deleteFileRecursive(File file) {
        if (file.isDirectory()) {
            File[] files = file.listFiles();
            if (files == null) {
                return;
            }

            for (File child : files) {
                deleteFileRecursive(child);
            }
        }
        file.delete();
    }

    @Nested
    @DisplayName("이미지 업로드")
    class ImageUpload {

        @Test
        @DisplayName("정상적인 요청이라면 이미지를 업로드한다.")
        void success() {
            // given
            MultipartFile multipartFile = mockingMultipartFile();

            // when
            String imagePath = localUploader.upload(multipartFile);

            // then
            File file = new File(imagePath);
            assertThat(file).exists();
        }

        @Test
        @DisplayName("이미지 파일이 존재하지 않으면 null 이미지 경로를 반환한다.")
        void nullImage() {
            // given
            MultipartFile multipartFile = null;

            // when
            String imagePath = localUploader.upload(multipartFile);

            // then
            assertThat(imagePath).isNull();
        }

        @Test
        @DisplayName("이미지 파일이 비어있으면 null 이미지 경로를 반환한다.")
        void emptyImage() {
            // given
            MultipartFile multipartFile = new MockMultipartFile(
                    "images",
                    "votogether.png",
                    MediaType.IMAGE_JPEG_VALUE,
                    "".getBytes()
            );

            // when
            String imagePath = localUploader.upload(multipartFile);

            // then
            assertThat(imagePath).isNull();
        }

        @Test
        @DisplayName("이미지 파일이 아니라면 예외를 던진다.")
        void invalidImage() {
            // given
            MultipartFile multipartFile = new MockMultipartFile(
                    "images",
                    "votogether.txt",
                    MediaType.TEXT_PLAIN_VALUE,
                    "hello".getBytes()
            );

            // when, then
            assertThatThrownBy(() -> localUploader.upload(multipartFile))
                    .isInstanceOf(ImageException.class)
                    .hasMessage("이미지 파일만 업로드할 수 있습니다.");
        }

    }

    @Test
    @DisplayName("이미지를 삭제한다.")
    void deleteImage() {
        // given
        MultipartFile multipartFile = mockingMultipartFile();
        String imagePath = localUploader.upload(multipartFile);

        // when
        localUploader.delete(imagePath);

        // then
        File file = new File(imagePath);
        assertThat(file).doesNotExist();
    }

    private MultipartFile mockingMultipartFile() {
        return new MockMultipartFile(
                "images",
                "votogether.png",
                MediaType.IMAGE_JPEG_VALUE,
                generateMockImage()
        );
    }

    private byte[] generateMockImage() {
        BufferedImage image = new BufferedImage(100, 100, BufferedImage.TYPE_INT_RGB);

        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            ImageIO.write(image, "jpg", byteArrayOutputStream);
            return byteArrayOutputStream.toByteArray();
        } catch (IOException e) {
            throw new ImageException(ImageExceptionType.IMAGE_TRANSFER);
        }
    }

}
