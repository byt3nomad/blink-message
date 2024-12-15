package com.sam.blink.service;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.sam.blink.exception.InvalidMessageData;
import com.sam.blink.exception.MessageAlreadyOpened;
import com.sam.blink.exception.MessageNotFound;
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
        var message = Message.builder()
                .id(NanoIdUtils.randomNanoId())
                .encryptedMessage(request.encryptedMessage())
                .iv(request.iv())
                .opened(false)
                .build();

        messageRepository.save(message);

        return new MessageCreateResponse(message.getId());
    }

    public MessageOpenResponse open(String id) {
        var message = messageRepository
                .findById(id)
                .orElseThrow(MessageNotFound::new);

        if (message.isOpened()) {
            throw new MessageAlreadyOpened();
        }

        //If one of the data is missing it can't be decrypted.
        var encryptedMessage = message.getEncryptedMessage().orElseThrow(InvalidMessageData::new);
        var iv = message.getIv().orElseThrow(InvalidMessageData::new);

        //Open the message
        message.setOpened(true);
        message.setIv(null);
        message.setEncryptedMessage(null);

        messageRepository.save(message);

        return new MessageOpenResponse(encryptedMessage, iv);
    }
}
