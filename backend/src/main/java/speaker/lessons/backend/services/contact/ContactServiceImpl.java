package speaker.lessons.backend.services.contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import speaker.lessons.backend.dtos.ContactMeDto;
import speaker.lessons.backend.repositories.CourseRepository;
import speaker.lessons.backend.services.EmailService;

import java.util.Properties;

@Service
public class ContactServiceImpl implements ContactService {
    private final EmailService emailService;
    
    @Autowired
    public ContactServiceImpl( EmailService emailService) {
        this.emailService = emailService;
    }
    
    @Override
    public void contactMe(ContactMeDto contactMeDto){
        emailService.sendEmail(contactMeDto);
    }
    
}
