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

import java.time.Instant;
import java.util.Optional;

@Service
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
        var views = message.getViews().stream()
                .map(view -> view.getViewedAt().toEpochMilli())
                .toList();
        var destroyedAt = message.getDestroyedAt().map(Instant::toEpochMilli).orElse(null);

        return MessageInfoResponse.builder()
                .createdAt(message.getCreatedAt().toEpochMilli())
                .destroyed(isMessageDestroyed(message))
                .destroyedAt(destroyedAt)
                .views(views)
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
            message.setEncryptedMessage(null);
            message.setDestroyedAt(Instant.now());
        }

        repository.save(message);
        return new MessageOpenResponse(encryptedMessage, message.getConfiguration().isEncryptedWithPassword());
    }

    private Message findOrThrow(String id) {
        return repository
                .findById(id)
                .orElseThrow(MessageNotFound::new);
    }

    private MessageConfiguration buildMessageConfiguration(MessageConfigurationRequest request) {
        var expireAt = Optional.ofNullable(request.expireAt())
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
                .expireAt(expireAt)
                .build();
    }

    private MessageConfigurationResponse toMessageConfigurationResponse(MessageConfiguration configuration) {
        var expireAt = Optional.ofNullable(configuration.getExpireAt()).map(Instant::toEpochMilli).orElse(null);
        return MessageConfigurationResponse
                .builder()
                .encryptedWithPassword(configuration.isEncryptedWithPassword())
                .viewCount(configuration.getViewCount())
                .expireAt(expireAt)
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
