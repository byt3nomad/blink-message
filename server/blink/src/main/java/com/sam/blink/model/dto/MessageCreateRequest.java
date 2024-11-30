package com.sam.blink.model.dto;

import lombok.NonNull;

public record MessageCreateRequest(@NonNull String content) {}