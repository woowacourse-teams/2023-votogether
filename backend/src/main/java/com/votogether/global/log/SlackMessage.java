package com.votogether.global.log;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Builder;

@Builder
public record SlackMessage(
        String channel,
        String text,
        List<Attachment> attachments,
        @JsonProperty("icon_emoji")
        String iconEmoji,
        String username
) {
}
