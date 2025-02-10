package com.sam.blink.model.dto;

import lombok.Builder;

@Builder
public record MessageConfigurationResponse(boolean encryptedWithPassword,
                                           int viewCount,
                                           Long destroyAt) {
}
