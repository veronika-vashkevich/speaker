package speaker.lessons.backend.dtos;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import speaker.lessons.backend.dtos.courses.PersonDTO;
import speaker.lessons.backend.models.lesson.Lesson;
import speaker.lessons.backend.models.lesson.LessonType;

import java.util.HashSet;
import java.util.Set;

@Data
@EqualsAndHashCode()
@NoArgsConstructor
public class ContactMeDto {

    private String name;
    private String email;
    private String phone;
}
