package com.votogether.domain.post.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import org.springframework.format.annotation.DateTimeFormat;

@Schema(name = "게시글 관련 데이터", description = "게시글에 관련한 데이터들입니다.")
@Builder
public record PostCreateRequest (
        List<Long> categoryIds,
        String title,
        String content,
        List<String> postOptionContents,

        @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime deadline
){

}
