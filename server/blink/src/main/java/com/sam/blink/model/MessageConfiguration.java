package com.sam.blink.model;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.sam.blink.model.dto.MessageConfigurationRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Optional;

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
    @Column(name = "expire_at")
    private Instant expireAt;

    public static MessageConfiguration from(MessageConfigurationRequest request) {
        var expireAt = Optional.ofNullable(request.expireAt())
                .map(Instant::ofEpochMilli)
                .orElse(null);
        return MessageConfiguration
                .builder()
                .id(NanoIdUtils.randomNanoId())
                .encryptedWithPassword(request.encryptedWithPassword())
                .viewCount(request.viewCount())
                .expireAt(expireAt)
                .build();
    }
}
