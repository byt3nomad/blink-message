package com.sam.blink.model.dto;

import jakarta.validation.constraints.Size;
import lombok.NonNull;

public record MessageCreateRequest(
        @NonNull
        @Size(min = 1, max = 5000, message = "encryptedMessage size must be between 1 and 5000 characters.")
        String encryptedMessage,

        @Size(min = 1, max = 100, message = "iv size must be between 1 and 100 characters.")
        @NonNull
        String iv) {
}