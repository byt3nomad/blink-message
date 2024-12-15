package com.sam.blink.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

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

    @Setter
    @Column
    private String iv;

    @Getter
    @Setter
    @Column(name = "is_opened")
    private boolean opened;

    public Optional<String> getEncryptedMessage() {
        return Optional.ofNullable(encryptedMessage);
    }

    public Optional<String> getIv() {return Optional.ofNullable(iv);}
}
