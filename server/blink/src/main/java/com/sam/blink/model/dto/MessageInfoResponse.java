package com.sam.blink.model.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record MessageInfoResponse(long createdAt,
                                  boolean destroyed,
                                  Long destroyedAt,
                                  List<Long> views,
                                  MessageConfigurationResponse configuration) {
}
