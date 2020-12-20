package speaker.lessons.backend.services.lesson;

import org.springframework.stereotype.Service;
import speaker.lessons.backend.controllers.exceptions.course.CourseException;
import speaker.lessons.backend.controllers.exceptions.lesson.LessonException;
import speaker.lessons.backend.models.Course;
import speaker.lessons.backend.models.authorization.User;
import speaker.lessons.backend.models.lesson.Lesson;
import speaker.lessons.backend.repositories.CourseRepository;
import speaker.lessons.backend.repositories.LessonRepository;
import speaker.lessons.backend.services.security.ISecurityService;

import java.util.Collection;
import java.util.Comparator;
import java.util.List;

@Service
public class LessonService implements ILessonService {
    //    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final ISecurityService securityService;

    public LessonService(/*CourseRepository courseRepository, */LessonRepository lessonRepository, ISecurityService securityService) {
        //        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
        this.securityService = securityService;
    }

    //    @Override
    //    public List<Lesson> getAllLessonsByUserId(){
    //        Integer userId = securityService.getCurrentUser()
    //                .orElseThrow(() -> new CourseException("Trying to get current user returned Optional.empty()."))
    //                .getId();
    //        return this.lessonRepository.findAllLessonsByUserId(userId);
    //    }

    @Override
    public Collection<Lesson> getAllLessonsByCourseId(Integer courseId) {
        List<Lesson> lessons = this.lessonRepository.getAllLessonsByCourseId(courseId);
        lessons.sort(Comparator.comparing(Lesson::getOrderIndex)); 
        return lessons;
    }

    class SortByOrderIndex implements Comparator<Lesson> {
        // Used for sorting in ascending order of 
        // roll number 
        public int compare(Lesson a, Lesson b) {
            return a.getOrderIndex() - b.getOrderIndex();
        }
    }

    public Collection<Lesson> getAllLessons() {
        return this.lessonRepository.findAll();
    }

    //    @Override
    //    public Lesson createLesson(Integer courseId, Lesson lesson) {
    //        Course course = this.courseRepository
    //                .findById(courseId)
    //                .orElseThrow(() -> new LessonException("Course not found!"));
    //
    //        lesson.setOrderIndex(course.getLessons().size());
    //        lesson.setCourse(course);
    //
    //        return lessonRepository.save(lesson);
    //    }
    //
    //    @Override
    //    public Lesson reOrderLesson(Integer courseId, Integer lessonId, Integer order) {
    //        Lesson firstLesson = this.lessonRepository
    //                .findById(lessonId)
    //                .orElseThrow(() -> new LessonException("Lesson not found!"));
    //
    //        Course course = this.courseRepository
    //                .findById(courseId)
    //                .orElseThrow(() -> new LessonException("Course not found!"));
    //
    //        if (course.getLessons().size() <= order || order < 0)
    //            throw new LessonException("Invalid order index");
    //
    //        Lesson secondLesson = this.lessonRepository
    //                .findByCourse_IdAndOrderIndex(courseId, order)
    //                .orElseThrow(() -> new LessonException("Lesson to be swapped with not found!"));
    //
    //        secondLesson.setOrderIndex(firstLesson.getOrderIndex());
    //        lessonRepository.save(secondLesson);
    //
    //        firstLesson.setOrderIndex(order);
    //        return lessonRepository.save(firstLesson);
    //    }

}
