package com.sam.blink.model.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record MessageConfigurationRequest(
        boolean encryptedWithPassword,

        @Min(value = 1, message = "viewCount must be greater than or equal to 1")
        @Max(value = 100, message = "viewCount must be less than or equal to 100")
        int viewCount,

        Long destroyAt) {
}
