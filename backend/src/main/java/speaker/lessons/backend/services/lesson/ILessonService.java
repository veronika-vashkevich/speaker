package speaker.lessons.backend.services.lesson;

import speaker.lessons.backend.dtos.lesson.LessonDTO;
import speaker.lessons.backend.models.lesson.Lesson;

import java.util.Collection;

public interface ILessonService {
//    Lesson createLesson(Integer courseId, Lesson lesson);
//    List<Lesson> getAllLessonsByUserId();
    Collection<Lesson> getAllLessons();
    Collection<Lesson> getAllLessonsByCourseId(Integer courseId);
    Lesson createLesson(LessonDTO lessonDTO);


//    Lesson reOrderLesson(Integer courseId, Integer lessonId, Integer order);
}
