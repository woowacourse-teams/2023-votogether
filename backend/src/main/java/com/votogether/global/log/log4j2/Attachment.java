package com.votogether.global.log.log4j2;

import lombok.Builder;

@Builder
public record Attachment(
        String fallback,
        String text,
        String color
) {
}
