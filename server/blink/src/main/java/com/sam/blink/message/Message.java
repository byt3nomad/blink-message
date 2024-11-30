package com.sam.blink.message;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    @Id
    @Getter
    private String id;

    @Column
    private String content;

    @Getter
    @Column(name = "is_opened")
    private boolean opened;

    public Optional<String> getContent() {
        return Optional.ofNullable(content);
    }

    public static Message of(String content) {
        return Message.builder()
                .id(NanoIdUtils.randomNanoId())
                .content(content)
                .opened(false)
                .build();
    }
}
