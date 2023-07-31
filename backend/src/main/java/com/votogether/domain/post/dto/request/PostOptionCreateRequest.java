package com.votogether.domain.post.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import org.hibernate.validator.constraints.Length;

@Schema(description = "게시글 선택지에 관련한 데이터들입니다.")
@Builder
public record PostOptionCreateRequest(
        @Schema(description = "선택지 내용", example = "content")
        @NotBlank(message = "해당 선택지의 내용을 입력해주세요.")
        @Length(max = 50, message = "선택지의 내용은 최대 50자까지 입력 가능합니다.")
        String content,

        @Schema(description = "선택지 이미지 URL", example = "imageUrl")
        String imageUrl
) {
}
