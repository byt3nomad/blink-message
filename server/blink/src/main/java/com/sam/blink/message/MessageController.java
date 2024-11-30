package com.sam.blink.message;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;

    @PostMapping("/api/v1/messages")
    public MessageCreateResponse create(@RequestBody MessageCreateRequest messageRequest) {
        return messageService.create(messageRequest);
    }
}
