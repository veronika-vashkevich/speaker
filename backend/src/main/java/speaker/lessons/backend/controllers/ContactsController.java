package speaker.lessons.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import speaker.lessons.backend.dtos.ContactMeDto;
import speaker.lessons.backend.services.contact.ContactService;

@RestController
@RequestMapping("/contacts")
public class ContactsController {
    
    private final ContactService contactService;

    @Autowired
    public ContactsController(ContactService contactService) {
       this.contactService = contactService;
    }

    @PostMapping("/contact-me")
    public ResponseEntity<ContactMeDto> contactMe(@RequestBody ContactMeDto contactMeDto) {
        this.contactService.contactMe(contactMeDto);
        return ResponseEntity.ok(contactMeDto);
    }
}
