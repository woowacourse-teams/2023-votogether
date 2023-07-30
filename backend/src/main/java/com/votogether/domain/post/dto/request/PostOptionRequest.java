package com.votogether.domain.post.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import org.hibernate.validator.constraints.Length;

@Builder
public record PostOptionRequest(
        @NotBlank(message = "해당 선택지의 내용을 입력해주세요.")
        @Length(min = 1, max = 50, message = "선택지의 내용은 최소 1자, 최대 50자까지 입력 가능합니다.")
        String content,

        String imageUrl
) {
}
