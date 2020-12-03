package speaker.lessons.backend.dtos.lesson;

import org.springframework.stereotype.Component;
import speaker.lessons.backend.dtos.IDTOConverter;
import speaker.lessons.backend.models.lesson.Lesson;

@Component
public class LessonConverter implements IDTOConverter<LessonDTO, Lesson> {
    @Override
    public LessonDTO createFrom(Lesson entity) {
        return new LessonDTO(entity);
    }

    @Override
    public Lesson createFrom(LessonDTO dto) {
        Lesson lesson = new Lesson();
        lesson.setId(dto.getId());
        lesson.setOrderIndex(dto.getOrderIndex());
        lesson.setContent(dto.getContent());
        lesson.setTitle(dto.getTitle());
        lesson.setUrl(dto.getUrl());
        lesson.setType(dto.getType());
        return lesson;
    }
}
