package com.sam.blink.service;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.sam.blink.exception.InvalidMessageData;
import com.sam.blink.exception.MessageAlreadyOpened;
import com.sam.blink.exception.MessageNotFound;
import com.sam.blink.model.Message;
import com.sam.blink.model.dto.MessageCreateRequest;
import com.sam.blink.model.dto.MessageCreateResponse;
import com.sam.blink.model.dto.MessageInfoResponse;
import com.sam.blink.model.dto.MessageOpenResponse;
import com.sam.blink.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;

    public MessageCreateResponse create(MessageCreateRequest request) {
        var message = Message.builder()
                .id(NanoIdUtils.randomNanoId())
                .encryptedMessage(request.encryptedMessage())
                .createdAt(Instant.now())
                .encryptedWithPassword(request.encryptedWithPassword())
                .opened(false)
                .build();

        messageRepository.save(message);

        return new MessageCreateResponse(message.getId());
    }

    public MessageInfoResponse getMessageInfo(String id) {
        var message = messageRepository
                .findById(id)
                .orElseThrow(MessageNotFound::new);

        var messageResponseBuilder = MessageInfoResponse.builder()
                .opened(message.isOpened())
                .createdAt(message.getCreatedAt().toEpochMilli());
        if(message.isOpened()) {
            // If opened we will have openedAt time.
            var openedAt = message.getOpenedAt().orElseThrow(InvalidMessageData::new).toEpochMilli();
            messageResponseBuilder.openedAt(openedAt);
        }

        return messageResponseBuilder.build();

    }

    public MessageOpenResponse open(String id) {
        var message = messageRepository
                .findById(id)
                .orElseThrow(MessageNotFound::new);

        if (message.isOpened()) {
            throw new MessageAlreadyOpened();
        }

        var encryptedMessage = message.getEncryptedMessage().orElseThrow(InvalidMessageData::new);

        //Open the message
        message.setOpened(true);
        message.setEncryptedMessage(null);
        message.setOpenedAt(Instant.now());

        messageRepository.save(message);

        return new MessageOpenResponse(encryptedMessage, message.isEncryptedWithPassword());
    }
}
