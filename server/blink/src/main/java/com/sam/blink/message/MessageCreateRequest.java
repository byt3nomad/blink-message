package com.sam.blink.message;

import lombok.NonNull;

public record MessageCreateRequest(@NonNull String content) {}