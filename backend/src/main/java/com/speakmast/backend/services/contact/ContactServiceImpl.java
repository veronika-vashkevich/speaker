package com.speakmast.backend.services.contact;

import com.speakmast.backend.dtos.ContactMeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.speakmast.backend.services.EmailService;

import javax.mail.MessagingException;

@Service
public class ContactServiceImpl implements ContactService {
    private final EmailService emailService;
    
    @Autowired
    public ContactServiceImpl( EmailService emailService) {
        this.emailService = emailService;
    }
    
    @Override
    public void contactMe(ContactMeDto contactMeDto) throws MessagingException{
        emailService.sendEmail(contactMeDto);
    }
    
}
