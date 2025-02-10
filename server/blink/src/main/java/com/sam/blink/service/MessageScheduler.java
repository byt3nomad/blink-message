package com.sam.blink.service;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Log4j2
@Component
@AllArgsConstructor
public class MessageScheduler {
    private final MessageService messageService;

    @Scheduled(cron = "0 * * * * *")
    public void destroyExpiredMessages() {
        log.info("Destroying expired messages job started.");
        messageService.destroyExpiredMessages();
    }
}
