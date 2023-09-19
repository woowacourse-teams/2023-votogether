package com.votogether.domain.post.dto.request.post;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Schema(description = "게시글 옵션 작성 요청")
public class PostOptionCreateRequest {

    @Schema(description = "게시글 옵션 내용", example = "1번 옵션")
    @NotBlank(message = "게시글 옵션 내용이 존재하지 않거나 공백만 존재합니다.")
    private String content;

    @Schema(description = "게시글 옵션 이미지 파일", example = "votogether.png")
    private MultipartFile imageFile;

}
