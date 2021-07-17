package com.speakmast.backend.services.lesson;

import com.speakmast.backend.controllers.exceptions.course.CourseException;
import com.speakmast.backend.dtos.lesson.LessonConverter;
import com.speakmast.backend.dtos.lesson.LessonDTO;
import com.speakmast.backend.models.Course;
import com.speakmast.backend.models.lesson.Lesson;
import com.speakmast.backend.models.lesson.LessonType;
import com.speakmast.backend.repositories.CourseRepository;
import com.speakmast.backend.repositories.LessonRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.speakmast.backend.services.google.GoogleService;
import com.speakmast.backend.services.security.ISecurityService;

import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LessonService implements ILessonService {
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final ISecurityService securityService;
    private final LessonConverter lessonConverter;
    private final GoogleService googleService;

    public LessonService(LessonRepository lessonRepository, ISecurityService securityService, LessonConverter lessonConverter, CourseRepository courseRepository, GoogleService googleService) {
        this.lessonRepository = lessonRepository;
        this.securityService = securityService;
        this.lessonConverter = lessonConverter;
        this.courseRepository = courseRepository;
        this.googleService = googleService;
    }

    @Override
    public Collection<Lesson> getAllLessonsByCourseId(Integer courseId) {
        List<Lesson> lessons = this.lessonRepository.getAllLessonsByCourseId(courseId);
        lessons.sort(Comparator.comparing(Lesson::getOrderIndex));
        return lessons;
    }

    class SortByOrderIndex implements Comparator<Lesson> {

        public int compare(Lesson a, Lesson b) {
            return a.getOrderIndex() - b.getOrderIndex();
        }
    }

    @Override
    public Lesson createLesson(LessonDTO lessonDto) {
        if (userOwnsCourse(lessonDto.getCourseId())) {
            Optional<Course> course = this.courseRepository.findById(lessonDto.getCourseId());
            lessonDto.setCourse(course.get());
            enrichLessonDtoWithPptUrls(lessonDto);

            return this.lessonRepository.save(lessonConverter.createFrom(lessonDto));
        } else
            throw new IllegalArgumentException("User does not own the course");

    }

    ;

    @Override
    public void deleteLesson( Integer lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(RuntimeException::new);
        if (userOwnsCourse(lesson.getCourse().getId())) {
            this.lessonRepository.deleteById(lessonId);
        } else
            throw new IllegalArgumentException("User does not own the course");
    }

    @Override
    @Transactional
    public void updateLesson(Integer lessonId, String lessonTitle){
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(RuntimeException::new);
        if (userOwnsCourse(lesson.getCourse().getId())) {
            this.lessonRepository.updateLessonTitle(lessonId, lessonTitle);
        } else
            throw new IllegalArgumentException("User does not own the course");
    }

    private boolean userOwnsCourse(Integer courseId) {
        Integer userId = securityService.getCurrentUser()
                .orElseThrow(() -> new CourseException("Trying to get current user returned Optional.empty()."))
                .getId();
        return this.courseRepository.getAllCoursesByUserId(userId).stream().map(Course::getId)
                .collect(Collectors.toList()).contains(courseId);
    }

    public Collection<Lesson> getAllLessons() {
        return this.lessonRepository.findAll();
    }

    private LessonDTO enrichLessonDtoWithPptUrls(LessonDTO lessonDTO) {
        String pptUrl = googleService.createPptUrl(lessonDTO);
        lessonDTO.setUrl(googleService.createViewPptUrl(pptUrl));
        lessonDTO.setPptUpdateUrl(googleService.crateUpdatePptUrl(pptUrl));
        lessonDTO.setType(LessonType.IMAGE);
        lessonDTO.setContent(lessonDTO.getTitle());

        return lessonDTO;
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
