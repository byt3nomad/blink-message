package com.sam.blink.service;

import com.sam.blink.exception.MessageAlreadyOpened;
import com.sam.blink.exception.MessageNotFoundException;
import com.sam.blink.model.dto.MessageOpenResponse;
import com.sam.blink.repository.MessageRepository;
import com.sam.blink.model.Message;
import com.sam.blink.model.dto.MessageCreateRequest;
import com.sam.blink.model.dto.MessageCreateResponse;
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

    public MessageOpenResponse open(String id) {
        var message =  messageRepository
                .findById(id)
                .orElseThrow(MessageNotFoundException::new);

        if(message.isOpened()){
            throw new MessageAlreadyOpened();
        }

        var content = message.getContent().orElse(null);

        message.open();
        messageRepository.save(message);

        return new MessageOpenResponse(content);
    }
}
