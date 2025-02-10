package com.sam.blink.repository;

import com.sam.blink.model.Message;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends CrudRepository<Message, String> {
    @Query("SELECT m FROM Message m JOIN m.configuration c where CURRENT_TIMESTAMP >= c.destroyAt")
    List<Message> findAllMessagesForDestruction();
}
