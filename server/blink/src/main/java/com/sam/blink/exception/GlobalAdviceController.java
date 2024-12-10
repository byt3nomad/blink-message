package com.sam.blink.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Date;

@RestControllerAdvice
public class GlobalAdviceController {
    @ExceptionHandler(MessageNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponse handleMessageNotFoundException(MessageNotFoundException e) {
        return new ExceptionResponse(
                HttpStatus.NOT_FOUND.value(),
                "Message not found!",
                LocalDateTime.now());
    }

    @ExceptionHandler(MessageAlreadyOpened.class)
    @ResponseStatus(HttpStatus.GONE)
    public ExceptionResponse handleMessageAlreadyOpened(MessageAlreadyOpened e) {
        return new ExceptionResponse(
                HttpStatus.GONE.value(),
                "Message already opened!",
                LocalDateTime.now());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ExceptionResponse handleGlobalException(Exception e) {
        return new ExceptionResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "An unexpected error occurred!",
                LocalDateTime.now());
    }
}