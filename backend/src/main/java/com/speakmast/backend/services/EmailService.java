package com.speakmast.backend.services;

import com.speakmast.backend.dtos.ContactMeDto;

public interface EmailService {
    void sendEmail(ContactMeDto contactMeDto);
}
