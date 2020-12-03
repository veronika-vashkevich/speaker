package speaker.lessons.backend.services.lesson;

import speaker.lessons.backend.models.lesson.Lesson;

public interface ILessonService {
    Lesson createLesson(Integer courseId, Lesson lesson);

    Lesson reOrderLesson(Integer courseId, Integer lessonId, Integer order);
}
