package com.sam.blink.service;

import com.sam.blink.exception.MessageNotFound;
import com.sam.blink.model.Message;
import com.sam.blink.model.dto.MessageCreateRequest;
import com.sam.blink.model.dto.MessageCreateResponse;
import com.sam.blink.model.dto.MessageInfoResponse;
import com.sam.blink.model.dto.MessageOpenResponse;
import com.sam.blink.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository repository;

    public MessageCreateResponse create(MessageCreateRequest request) {
        var message = Message.from(request);
        repository.save(message);
        return new MessageCreateResponse(message.getId());
    }

    public MessageInfoResponse getMessageInfo(String id) {
        var message = findOrThrow(id);
        return MessageInfoResponse.from(message);
    }

    public MessageOpenResponse view(String id) {
        var message = findOrThrow(id);
        var encryptedMessage = message.view();
        repository.save(message);
        return new MessageOpenResponse(encryptedMessage, message.getConfiguration().isEncryptedWithPassword());
    }

    private Message findOrThrow(String id) {
        return repository
                .findById(id)
                .orElseThrow(MessageNotFound::new);
    }
}
