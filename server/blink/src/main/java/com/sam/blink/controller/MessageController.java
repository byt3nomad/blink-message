package com.sam.blink.controller;

import com.sam.blink.exception.MessageNotFoundException;
import com.sam.blink.model.dto.MessageCreateRequest;
import com.sam.blink.model.dto.MessageCreateResponse;
import com.sam.blink.model.dto.MessageOpenResponse;
import com.sam.blink.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;

    @PostMapping("/api/v1/messages")
    public MessageCreateResponse create(@RequestBody MessageCreateRequest messageRequest) {
        return messageService.create(messageRequest);
    }

    @PostMapping("/api/v1/messages/{id}/open")
    public MessageOpenResponse open(@PathVariable String id) {
        return messageService.open(id);
    }
}
