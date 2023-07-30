package com.votogether.domain.post.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

@Schema(name = "게시글 관련 데이터", description = "게시글에 관련한 데이터들입니다.")
@Builder
public record PostRequest(
        List<Long> categoryIds,

        @NotBlank(message = "제목을 입력해주세요.")
        @Length(min = 1, max = 100, message = "제목은 최소 1자, 최대 100자까지 입력 가능합니다.")
        String title,

        @NotBlank(message = "내용을 입력해주세요.")
        @Length(min = 1, max = 1000, message = "내용은 최소 1자, 최대 1000자까지 입력 가능합니다.")
        String content,

        String imageUrl,

        @Valid
        @NotNull(message = "선택지는 최소 2개 이상 등록해야 합니다.")
        @Size(min = 2, max = 5, message = "선택지는 최소 2개, 최대 5개까지 등록 가능합니다.")
        List<PostOptionRequest> postOptions,

        @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime deadline
) {
}
