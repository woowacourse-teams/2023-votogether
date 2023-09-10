package com.votogether.domain.post.dto.request.post;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

@Schema(description = "게시글 작성 요청")
public record PostCreateRequest(
        @Schema(description = "카테고리 ID 목록", example = "[1, 2]")
        @Size(min = 1, message = "게시글 카테고리는 최소 1개 이상 등록이 필요합니다.")
        List<Long> categoryIds,

        @Schema(description = "게시글 제목", example = "보투게더에 대하여")
        @NotBlank(message = "게시글 제목이 존재하지 않거나 공백만 존재합니다.")
        String title,

        @Schema(description = "게시글 내용", example = "보투게더 정말 재밌어요!")
        @NotBlank(message = "게시글 내용이 존재하지 않거나 공백만 존재합니다.")
        String content,

        @Schema(description = "게시글 이미지 URL", example = "https://votogether.com/static/images/image.png")
        String imageUrl,

        @Schema(description = "게시글 이미지 파일", example = "votogether.png")
        MultipartFile contentImage,

        @Schema(description = "게시글 옵션 작성 목록")
        List<PostOptionCreateRequest> postOptions,

        @Schema(description = "게시글 마감시간", example = "2023-08-01 12:25")
        @NotNull(message = "게시글 마감시간을 등록하지 않았습니다.")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime deadline
) {
}
