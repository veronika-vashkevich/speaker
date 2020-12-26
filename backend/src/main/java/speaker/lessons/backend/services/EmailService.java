package speaker.lessons.backend.services;

import speaker.lessons.backend.dtos.ContactMeDto;

public interface EmailService {
    void sendEmail(ContactMeDto contactMeDto);
}
