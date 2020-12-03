package speaker.lessons.backend.dtos.courses;

import org.springframework.stereotype.Component;
import speaker.lessons.backend.dtos.IDTOConverter;
import speaker.lessons.backend.dtos.lesson.LessonDTO;
import speaker.lessons.backend.models.Course;

import java.util.stream.Collectors;

@Component
public class CourseConverter implements IDTOConverter<CourseDTO, Course> {

    @Override
    public CourseDTO createFrom(Course entity) {
        CourseDTO courseDto = new CourseDTO();
        courseDto.setId(entity.getId());
        courseDto.setName(entity.getName());
        courseDto.setDescription(entity.getDescription());
        PersonDTO ownerDTO = new PersonDTO(entity.getTeacher().getId(), entity.getTeacher().getFirstName(), entity.getTeacher().getEmail());
        courseDto.setStudents(entity.getPupils()
                .stream()
                .map(enrollment ->
                        new PersonDTO(
                                enrollment.getPupil().getId(),
                                enrollment.getPupil().getFirstName(),
                                enrollment.getPupil().getEmail()))
                .collect(Collectors.toSet()));
        courseDto.setOwner(ownerDTO);
        courseDto.setLessons(entity.getLessons()
                .stream()
                .map(LessonDTO::new)
                .collect(Collectors.toList()));
        return courseDto;
    }

    @Override
    public Course createFrom(CourseDTO dto) {
        Course course = new Course();
        course.setId(dto.getId());
        course.setName(dto.getName());
        course.setDescription(dto.getDescription());
        return course;
    }
}
