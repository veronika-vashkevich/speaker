package speaker.lessons.backend.services.lesson;

import speaker.lessons.backend.models.Course;
import speaker.lessons.backend.models.authorization.User;
import speaker.lessons.backend.models.lesson.Lesson;

import java.util.Collection;
import java.util.List;

public interface ILessonService {
//    Lesson createLesson(Integer courseId, Lesson lesson);
//    List<Lesson> getAllLessonsByUserId();
    Collection<Lesson> getAllLessons();
    Collection<Lesson> getAllLessonsByCourseId(Integer courseId);
    

//    Lesson reOrderLesson(Integer courseId, Integer lessonId, Integer order);
}
