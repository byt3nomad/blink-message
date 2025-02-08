package com.sam.blink.model.dto;

import lombok.Builder;

@Builder
public record MessageInfoResponse( boolean opened,
                                   long createdAt,
                                   Long openedAt) {

}
