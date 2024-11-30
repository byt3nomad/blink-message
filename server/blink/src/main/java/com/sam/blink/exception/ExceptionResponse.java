package com.sam.blink.exception;

import java.time.LocalDateTime;

public record ExceptionResponse(int code, String message, LocalDateTime timestamp) {
}
