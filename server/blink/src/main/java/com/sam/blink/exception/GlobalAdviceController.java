package com.sam.blink.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalAdviceController {
    @ExceptionHandler(MessageNotFound.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponse handleMessageNotFoundException(MessageNotFound e) {
        return new ExceptionResponse(
                HttpStatus.NOT_FOUND.value(),
                "Message not found!",
                LocalDateTime.now());
    }

    @ExceptionHandler(MessageDestroyed.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ExceptionResponse handleMessageDestroyed(MessageDestroyed e) {
        return new ExceptionResponse(
                HttpStatus.BAD_REQUEST.value(),
                "Message destroyed!",
                LocalDateTime.now());
    }

    @ExceptionHandler(InvalidMessageData.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ExceptionResponse handleInvalidMessageData(InvalidMessageData e) {
        return new ExceptionResponse(
                HttpStatus.BAD_REQUEST.value(),
                "Invalid message data!",
                LocalDateTime.now());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ExceptionResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        var combinedErrorMessage =e.getAllErrors()
                .stream()
                .map(ObjectError::getDefaultMessage)
                .collect(Collectors.joining(", "));

        return new ExceptionResponse(
                HttpStatus.BAD_REQUEST.value(),
                combinedErrorMessage,
                LocalDateTime.now());
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ExceptionResponse handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        return new ExceptionResponse(
                HttpStatus.BAD_REQUEST.value(),
                e.getMessage(),
                LocalDateTime.now());
    }

//    @ExceptionHandler(Exception.class)
//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//    public ExceptionResponse handleGlobalException(Exception e) {
//        return new ExceptionResponse(
//                HttpStatus.INTERNAL_SERVER_ERROR.value(),
//                "An unexpected error occurred!",
//                LocalDateTime.now());
//    }
}
