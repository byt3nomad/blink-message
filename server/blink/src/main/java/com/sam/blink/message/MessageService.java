package com.sam.blink.message;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;

    public MessageCreateResponse create(MessageCreateRequest request) {
        var message = Message.of(request.content());
        messageRepository.save(message);
        return new MessageCreateResponse(message.getId());
    }
}
