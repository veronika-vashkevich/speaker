package com.speakmast.backend.controllers.exceptions.user;

public class EmailException extends RuntimeException {
    public EmailException(String message) {
        super(message);
    }
}
