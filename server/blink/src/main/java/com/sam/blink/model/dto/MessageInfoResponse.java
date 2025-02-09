package com.sam.blink.model.dto;

import com.sam.blink.model.Message;
import lombok.Builder;

import java.time.Instant;
import java.util.List;

@Builder
public record MessageInfoResponse(long createdAt,
                                  boolean destroyed,
                                  Long destroyedAt,
                                  List<Long> views,
                                  MessageConfigurationResponse configuration) {
    public static MessageInfoResponse from(Message message) {
        var views = message.getViews().stream()
                .map(view -> view.getViewedAt().toEpochMilli())
                .toList();
        var configuration = MessageConfigurationResponse.from(message.getConfiguration());
        var destroyedAt = message.getDestroyedAt().map(Instant::toEpochMilli).orElse(null);
        return MessageInfoResponse.builder()
                .createdAt(message.getCreatedAt().toEpochMilli())
                .destroyed(message.isDestroyed())
                .destroyedAt(destroyedAt)
                .views(views)
                .configuration(configuration)
                .build();
    }
}
