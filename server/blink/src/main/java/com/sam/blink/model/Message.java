package com.sam.blink.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.time.Instant;
import java.util.Optional;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    @Id
    @Getter
    private String id;

    @Setter
    @Column(name = "encrypted_message")
    private String encryptedMessage;

    @Getter
    @Setter
    @Column(name = "is_opened")
    private boolean opened;

    @Getter
    @Setter
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Setter
    @Column(name = "opened_at")
    private Instant openedAt;

    @Getter
    @Column(name = "encrypted_with_password")
    private boolean encryptedWithPassword;

    public Optional<String> getEncryptedMessage() {
        return Optional.ofNullable(encryptedMessage);
    }

    public Optional<Instant> getOpenedAt() {
        return Optional.ofNullable(openedAt);
    }
}
