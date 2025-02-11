package com.sam.blink.service;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.sam.blink.exception.InvalidExpirationTimeException;
import com.sam.blink.exception.MessageDestroyed;
import com.sam.blink.exception.MessageNotFound;
import com.sam.blink.model.Message;
import com.sam.blink.model.MessageConfiguration;
import com.sam.blink.model.MessageView;
import com.sam.blink.model.dto.*;
import com.sam.blink.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository repository;

    public MessageCreateResponse create(MessageCreateRequest request) {
        var configuration = buildMessageConfiguration(request.configuration());

        var message = Message.builder()
                .id(NanoIdUtils.randomNanoId())
                .createdAt(Instant.now())
                .encryptedMessage(request.encryptedMessage())
                .configuration(configuration)
                .build();

        repository.save(message);
        return new MessageCreateResponse(message.getId());
    }

    public MessageInfoResponse getMessageInfo(String id) {
        var message = findOrThrow(id);

        var configuration = toMessageConfigurationResponse(message.getConfiguration());
        var viewTimestamps = message.getViews().stream()
                .map(view -> view.getViewedAt().toEpochMilli())
                .toList();
        var destroyedAt = message.getDestroyedAt().map(Instant::toEpochMilli).orElse(null);

        return MessageInfoResponse.builder()
                .createdAt(message.getCreatedAt().toEpochMilli())
                .destroyed(isMessageDestroyed(message))
                .destroyedAt(destroyedAt)
                .viewTimestamps(viewTimestamps)
                .configuration(configuration)
                .build();
    }

    public MessageOpenResponse view(String id) {
        var message = findOrThrow(id);

        if (isMessageDestroyed(message)) {
            throw new MessageDestroyed();
        }

        var view = createMessageView(message);
        message.getViews().add(view);

        var encryptedMessage = message.getEncryptedMessage();
        if (message.getViews().size() >= message.getConfiguration().getViewCount()) {
            destroyMessage(message);
        }

        repository.save(message);
        return new MessageOpenResponse(encryptedMessage, message.getConfiguration().isEncryptedWithPassword());
    }

    public void destroyMessagesForDestruction(){
        var expiredMessages = repository.findAllMessagesForDestruction();
        expiredMessages.forEach(this::destroyMessage);
        repository.saveAll(expiredMessages);
    }

    private void destroyMessage(Message message) {
        if(isMessageDestroyed(message)) {
            return;
        }
        message.setEncryptedMessage(null);
        message.setDestroyedAt(Instant.now());
    }

    private Message findOrThrow(String id) {
        return repository
                .findById(id)
                .orElseThrow(MessageNotFound::new);
    }

    private MessageConfiguration buildMessageConfiguration(MessageConfigurationRequest request) {
        var destroyAt = Optional.ofNullable(request.destroyAt())
                .map(expire -> {
                    var expireInstant = Instant.ofEpochMilli(expire);
                    if (expireInstant.isBefore(Instant.now())) {
                        throw new InvalidExpirationTimeException();
                    }
                    return expireInstant;
                })
                .orElse(null);
        return MessageConfiguration
                .builder()
                .id(NanoIdUtils.randomNanoId())
                .encryptedWithPassword(request.encryptedWithPassword())
                .viewCount(request.viewCount())
                .destroyAt(destroyAt)
                .build();
    }

    private MessageConfigurationResponse toMessageConfigurationResponse(MessageConfiguration configuration) {
        var destroyAt = Optional.ofNullable(configuration.getDestroyAt()).map(Instant::toEpochMilli).orElse(null);
        return MessageConfigurationResponse
                .builder()
                .encryptedWithPassword(configuration.isEncryptedWithPassword())
                .viewCount(configuration.getViewCount())
                .destroyAt(destroyAt)
                .build();
    }

    private boolean isMessageDestroyed(Message message) {
        return message.getEncryptedMessage() == null;
    }

    private MessageView createMessageView(Message message) {
        return MessageView.builder()
                .id(NanoIdUtils.randomNanoId())
                .viewedAt(Instant.now())
                .message(message)
                .build();
    }
}
