package com.sam.blink.controller;

import com.sam.blink.model.dto.MessageCreateRequest;
import com.sam.blink.model.dto.MessageCreateResponse;
import com.sam.blink.model.dto.MessageInfoResponse;
import com.sam.blink.model.dto.MessageOpenResponse;
import com.sam.blink.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;

    @PostMapping("/api/v1/messages")
    public MessageCreateResponse create(@RequestBody @Valid MessageCreateRequest messageRequest) {
        return messageService.create(messageRequest);
    }

    @GetMapping("/api/v1/messages/{id}/info")
    public MessageInfoResponse getMessageInfo(@PathVariable String id) {
        return messageService.getMessageInfo(id);
    }

    @PostMapping("/api/v1/messages/{id}/view")
    public MessageOpenResponse view(@PathVariable String id) {
        return messageService.view(id);
    }
}
