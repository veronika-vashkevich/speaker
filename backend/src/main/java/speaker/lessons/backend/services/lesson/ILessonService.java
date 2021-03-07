package speaker.lessons.backend.services.lesson;

import speaker.lessons.backend.dtos.lesson.LessonDTO;
import speaker.lessons.backend.models.lesson.Lesson;

import java.util.Collection;

public interface ILessonService {

    Collection<Lesson> getAllLessons();
    Collection<Lesson> getAllLessonsByCourseId(Integer courseId);
    Lesson createLesson(LessonDTO lessonDTO);
    void deleteLesson( Integer lessonId);
    void updateLesson(Integer lessonId, String lessonTitle);
}
