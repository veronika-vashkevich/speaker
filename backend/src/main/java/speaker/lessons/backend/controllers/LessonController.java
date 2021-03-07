package speaker.lessons.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import speaker.lessons.backend.dtos.lesson.LessonConverter;
import speaker.lessons.backend.dtos.lesson.LessonDTO;
import speaker.lessons.backend.models.lesson.Lesson;
import speaker.lessons.backend.services.lesson.ILessonService;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
//@RequestMapping("/lessons")
public class LessonController {

    //    private final ICourseService courseService;
    private final ILessonService lessonService;
    //
    //    private final CourseConverter courseConverter;
    private final LessonConverter lessonConverter;

    @Autowired
    public LessonController(/*ICourseService courseService, CourseConverter courseConverter,*/LessonConverter lessonConverter, ILessonService lessonService) {
        //        this.courseService = courseService;
        //        this.courseConverter = courseConverter;
        this.lessonConverter = lessonConverter;
        this.lessonService = lessonService;
    }

    //    @GetMapping("/lessons")
    //    public ResponseEntity<Collection<LessonDTO>> getAllLessons() {
    //        return ResponseEntity.ok(this.lessonService.getAllLessonsByUserId().stream()
    //                .map(this.lessonConverter::createFrom).collect(Collectors.toList()));
    //    }

    @GetMapping("/lessons")
    public Collection<LessonDTO> getAllLessons() {
        return lessonService.getAllLessons().stream().map(lesson -> lessonConverter.createFrom(lesson))
                .collect(Collectors.toList());
    }


    @PostMapping("/lessons/create")
    public Lesson createLesson( @RequestBody  LessonDTO lessonDTO) {
        return lessonService.createLesson(lessonDTO);
    }


    @PostMapping("/lessons/delete/{lessonId}")
    public void deleteLesson( @PathVariable Integer lessonId) {
        lessonService.deleteLesson(lessonId);
    }

    @PutMapping("/lessons/update/{lessonId}")
    public void updateLesson(@PathVariable Integer lessonId, @RequestBody LessonDTO lessonDto){
        lessonService.updateLesson(lessonId, lessonDto.getTitle());
    }
    //    @GetMapping("/{id}")
    //    public ResponseEntity<LessonDTO> getCourseById(@PathVariable Integer id) {
    //        return ResponseEntity.ok(this.courseConverter.createFrom(this.courseService.getCourseById(id)));
    //    }
    //
    //    @IsTeacher
    //    @PostMapping
    //    public ResponseEntity<CourseDTO> addCourse(@RequestBody CourseDTO course) {
    //        return ResponseEntity.ok(
    //                this.courseConverter.createFrom(this.courseService.addCourse(this.courseConverter.createFrom(course)))
    //        );
    //    }
    //
    //    @IsCourseOwner
    //    @DeleteMapping("/{id}")
    //    public void deleteCourse(@PathVariable Integer id) {
    //        this.courseService.deleteCourse(id);
    //    }
    //
    //    @IsCourseOwner
    //    @PutMapping("/{id}")
    //    public ResponseEntity<CourseDTO> updateCourse(@PathVariable Integer id, @Valid @RequestBody CourseDTO courseDTO) {
    //        Course course = this.courseConverter.createFrom(courseDTO);
    //        course.setId(id);
    //        return ResponseEntity.ok(this.courseConverter.createFrom(this.courseService.updateCourse(course)));
    //    }
    //
    //    @IsStudent
    //    @PostMapping("{id}/enroll")
    //    public ResponseEntity<CourseDTO> enroll(@PathVariable Integer id) {
    //        return ResponseEntity.ok(this.courseConverter.createFrom(this.courseService.enrollStudent(id)));
    //    }
    //
    //    @IsCourseOwner
    //    @PostMapping("/{id}/lessons")
    //    public ResponseEntity<LessonDTO> createLesson(@PathVariable Integer id, @RequestBody LessonDTO lessonDTO) {
    //        return ResponseEntity.ok(
    //                this.lessonConverter.createFrom(
    //                        this.lessonService.createLesson(
    //                                id, this.lessonConverter.createFrom(lessonDTO)))
    //        );
    //    }
    //
    //    @IsCourseOwner
    //    @PostMapping("/{id}/lessons/{lessonId}")
    //    public ResponseEntity<LessonDTO> reOrderLesson(
    //            @PathVariable Integer id,
    //            @PathVariable Integer lessonId,
    //            @RequestBody ReorderOperationDTO reorderOperation
    //    ) {
    //        int orderIndex = reorderOperation.getOrder();
    //        return ResponseEntity.ok(
    //                this.lessonConverter.createFrom(
    //                        this.lessonService.reOrderLesson(id, lessonId, orderIndex))
    //        );
    //    }

}
