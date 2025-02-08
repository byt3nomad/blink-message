package com.sam.blink.model.dto;

import lombok.NonNull;

public record MessageOpenResponse(@NonNull String encryptedMessage,
                                  boolean encryptedWithPassword) {
}
