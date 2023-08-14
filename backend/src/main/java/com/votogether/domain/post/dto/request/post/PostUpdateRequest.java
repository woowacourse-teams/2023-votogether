package com.votogether.domain.post.dto.request.post;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import org.hibernate.validator.constraints.Length;

@Schema(description = "게시글에 관련한 데이터들입니다.")
@Builder
public record PostUpdateRequest(
        @Schema(description = "카테고리의 여러 아이디", example = "[0, 2]")
        @Size(min = 1, message = "게시글에 해당하는 카테고리는 최소 1개 이상이어야 합니다.")
        List<Long> categoryIds,

        @Schema(description = "게시글 제목", example = "title")
        @NotBlank(message = "제목을 입력해주세요.")
        @Length(max = 100, message = "제목은 최대 100자까지 입력 가능합니다.")
        String title,

        @Schema(description = "게시글 내용", example = "content")
        @NotBlank(message = "내용을 입력해주세요.")
        @Length(max = 1000, message = "내용은 최대 1000자까지 입력 가능합니다.")
        String content,

        String imageUrl,

        @Schema(description = "게시글의 여러 선택지")
        @Valid
        @NotNull(message = "선택지는 최소 2개 이상 등록해야 합니다.")
        @Size(min = 2, max = 5, message = "선택지는 최소 2개, 최대 5개까지 등록 가능합니다.")
        List<PostOptionUpdateRequest> postOptions,

        @Schema(description = "마감 기한", example = "2023-08-01 15:30")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime deadline
) {
}
