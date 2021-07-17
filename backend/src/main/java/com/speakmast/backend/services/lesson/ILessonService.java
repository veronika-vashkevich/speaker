package com.speakmast.backend.services.lesson;

import com.speakmast.backend.dtos.lesson.LessonDTO;
import com.speakmast.backend.models.lesson.Lesson;

import java.util.Collection;

public interface ILessonService {

    Collection<Lesson> getAllLessons();
    Collection<Lesson> getAllLessonsByCourseId(Integer courseId);
    Lesson createLesson(LessonDTO lessonDTO);
    void deleteLesson( Integer lessonId);
    void updateLesson(Integer lessonId, String lessonTitle);
}
