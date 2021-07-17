package com.speakmast.backend.services.contact;

import com.speakmast.backend.dtos.ContactMeDto;
import org.springframework.stereotype.Service;

@Service
public interface ContactService {
    void contactMe(ContactMeDto contactMeDto);
}
