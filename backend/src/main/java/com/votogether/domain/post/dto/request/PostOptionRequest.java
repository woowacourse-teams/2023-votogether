package com.votogether.domain.post.dto.request;

import lombok.Builder;

@Builder
public record PostOptionRequest(
        String content,
        String imageUrl
) {
}
