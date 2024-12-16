package com.sam.blink.model.dto;

import lombok.Builder;

@Builder
public record MessageInfoResponse(String id, boolean opened, long createdAt, Long openedAt) {

}
