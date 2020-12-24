package speaker.lessons.backend.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import speaker.lessons.backend.dtos.courses.PersonDTO;
import speaker.lessons.backend.models.lesson.Lesson;
import speaker.lessons.backend.models.lesson.LessonType;

import java.util.HashSet;
import java.util.Set;

@Data
@EqualsAndHashCode()
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@ToString
public class ContactMeDto {
    
    private String name;
    private String email;
    private String phone;
}
