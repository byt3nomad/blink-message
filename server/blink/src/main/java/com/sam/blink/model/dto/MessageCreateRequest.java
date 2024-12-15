package com.sam.blink.model.dto;

import lombok.NonNull;

public record MessageCreateRequest(@NonNull String encryptedMessage, @NonNull String iv) {}