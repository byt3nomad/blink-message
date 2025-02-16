package com.sam.blink.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "message_view")
public class MessageView {

    @Id
    private String id;

    @Getter
    @Column(name = "viewed_at")
    private Instant viewedAt;

    @ManyToOne(optional = false)
    @JoinColumn(name = "message_id", nullable = false)
    private Message message;
}
