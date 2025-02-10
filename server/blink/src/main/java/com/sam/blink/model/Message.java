package com.sam.blink.model;

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

    @Getter
    @Setter
    @Column(name = "encrypted_message")
    private String encryptedMessage;

    @Getter
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Setter
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
}
