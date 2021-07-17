package com.speakmast.backend.dtos.lesson;

import com.speakmast.backend.dtos.IDTOConverter;
import com.speakmast.backend.models.lesson.Lesson;
import org.springframework.stereotype.Component;

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
        lesson.setCourse(dto.getCourse());
        lesson.setPptUpdateUrl(dto.getPptUpdateUrl());
        return lesson;
    }
}
