package com.sam.blink.model;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.sam.blink.exception.MessageDestroyed;
import com.sam.blink.model.dto.MessageCreateRequest;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    @Id
    @Getter
    private String id;

    @Column(name = "encrypted_message")
    private String encryptedMessage;

    @Getter
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "destroyed_at")
    private Instant destroyedAt;

    @Getter
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "message_configuration_id", nullable = false)
    private MessageConfiguration configuration;

    @Getter
    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MessageView> views = new ArrayList<>();

    public Optional<Instant> getDestroyedAt() {
        return Optional.ofNullable(destroyedAt);
    }

    public boolean isDestroyed() {
        return this.encryptedMessage == null;
    }

    public String view() {
        if (this.isDestroyed()) {
            throw new MessageDestroyed();
        }

        var view = MessageView.from(this);
        this.views.add(view);

        var message = this.encryptedMessage;
        if (this.views.size() >= this.configuration.getViewCount()) {
            this.encryptedMessage = null;
            this.destroyedAt = Instant.now();
        }

        return message;
    }

    public static Message from(MessageCreateRequest request) {
        var configuration = MessageConfiguration.from(request.configuration());
        return Message.builder()
                .id(NanoIdUtils.randomNanoId())
                .createdAt(Instant.now())
                .encryptedMessage(request.encryptedMessage())
                .configuration(configuration)
                .build();
    }
}
