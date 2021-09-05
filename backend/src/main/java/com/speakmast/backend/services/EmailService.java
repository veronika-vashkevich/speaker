package com.speakmast.backend.services;

import com.speakmast.backend.dtos.ContactMeDto;

import javax.mail.MessagingException;

public interface EmailService {
    void sendEmail(ContactMeDto contactMeDto)  throws MessagingException;
}
