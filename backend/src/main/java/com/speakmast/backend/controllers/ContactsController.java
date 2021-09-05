package com.speakmast.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.speakmast.backend.dtos.ContactMeDto;
import com.speakmast.backend.services.contact.ContactService;

import javax.mail.MessagingException;

@RestController
@RequestMapping("/contacts")
public class ContactsController {
    
    private final ContactService contactService;

    @Autowired
    public ContactsController(ContactService contactService) {
       this.contactService = contactService;
    }

    @PostMapping("/contact-me")
    public ResponseEntity<ContactMeDto> contactMe(@RequestBody ContactMeDto contactMeDto) throws MessagingException {
        this.contactService.contactMe(contactMeDto);
        ResponseEntity response = ResponseEntity.ok(contactMeDto);
        System.out.println(response.toString());
        return ResponseEntity.ok(contactMeDto);
    }
}
