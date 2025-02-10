package com.sam.blink.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "message_configuration")
public class MessageConfiguration {
    @Id
    private String id;

    @Getter
    @Column(name = "encrypted_with_password", nullable = false)
    private boolean encryptedWithPassword;

    @Getter
    @Column(name = "view_count", nullable = false)
    private int viewCount;

    @Getter
    @Column(name = "destroy_at")
    private Instant destroyAt;
}
