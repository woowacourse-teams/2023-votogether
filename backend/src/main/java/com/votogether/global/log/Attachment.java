package com.votogether.global.log;

import lombok.Builder;

@Builder
public record Attachment(
        String fallback,
        String text,
        String color
) {
}
