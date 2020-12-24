package speaker.lessons.backend.services.contact;

import org.springframework.stereotype.Service;
import speaker.lessons.backend.dtos.ContactMeDto;

@Service
public class ContactServiceImpl implements ContactService {
    
    @Override
    public void contactMe(ContactMeDto contactMeDto){
        System.out.println("Contact me sent!");
    }
}
