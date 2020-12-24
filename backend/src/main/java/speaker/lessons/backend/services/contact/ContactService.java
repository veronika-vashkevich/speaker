package speaker.lessons.backend.services.contact;

import org.springframework.stereotype.Service;
import speaker.lessons.backend.dtos.ContactMeDto;

@Service
public interface ContactService {
    void contactMe(ContactMeDto contactMeDto);
}
