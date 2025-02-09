package com.sam.blink.model.dto;

import com.sam.blink.model.MessageConfiguration;
import lombok.Builder;

import java.time.Instant;
import java.util.Optional;

@Builder
public record MessageConfigurationResponse(boolean encryptedWithPassword,
                                           int viewCount,
                                           Long expireAt) {
    public static MessageConfigurationResponse from(MessageConfiguration configuration) {
        var expireAt = Optional.ofNullable(configuration.getExpireAt()).map(Instant::toEpochMilli).orElse(null);
        return MessageConfigurationResponse
                .builder()
                .encryptedWithPassword(configuration.isEncryptedWithPassword())
                .viewCount(configuration.getViewCount())
                .expireAt(expireAt)
                .build();
    }
}
