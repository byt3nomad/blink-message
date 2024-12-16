package com.sam.blink;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cglib.core.Local;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;

@SpringBootApplication
public class BlinkApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlinkApplication.class, args);
	}

}
