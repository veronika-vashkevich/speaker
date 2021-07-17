package com.speakmast.backend.controllers;

import com.speakmast.backend.annotations.IsTeacher;
import com.speakmast.backend.dtos.courses.CourseConverter;
import com.speakmast.backend.dtos.courses.CourseDTO;
import com.speakmast.backend.dtos.lesson.LessonConverter;
import com.speakmast.backend.dtos.lesson.LessonDTO;
import com.speakmast.backend.models.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.speakmast.backend.annotations.IsCourseOwner;
import com.speakmast.backend.annotations.IsStudent;
import com.speakmast.backend.services.course.ICourseService;
import com.speakmast.backend.services.lesson.ILessonService;

import javax.validation.Valid;
import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/courses")
public class CourseController  {

    private final ICourseService courseService;
    private final ILessonService lessonService;

    private final CourseConverter courseConverter;
    private final LessonConverter lessonConverter;

    @Autowired
    public CourseController(ICourseService courseService, CourseConverter courseConverter, LessonConverter lessonConverter, ILessonService lessonService) {
        this.courseService = courseService;
        this.courseConverter = courseConverter;
        this.lessonConverter = lessonConverter;
        this.lessonService = lessonService;
    }

    @IsTeacher
    @GetMapping("/all")
    public ResponseEntity<Collection<Course>> getAllCoursesByOwnerId() {


        return ResponseEntity.ok(this.courseService.getAllCoursesByUserId());
    }


//    @GetMapping("/all")
//    public ResponseEntity<Collection<CourseDTO>> getAllCourses() {
//        return ResponseEntity.ok(this.courseService.getAllCourses().stream()
//                .map(this.courseConverter::createFrom).collect(Collectors.toList()));
//    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDTO> getCourseById(@PathVariable Integer id) {
        return ResponseEntity.ok(this.courseConverter.createFrom(this.courseService.getCourseById(id)));
    }

    @IsTeacher
    @PostMapping
    public ResponseEntity<CourseDTO> addCourse(@RequestBody CourseDTO course) {
        return ResponseEntity.ok(
                this.courseConverter.createFrom(this.courseService.addCourse(this.courseConverter.createFrom(course)))
        );
    }


    @GetMapping("/{courseId}/lessons")
    public Collection<LessonDTO> getAllLessonsByCourseId(@PathVariable Integer courseId) {
        return lessonService.getAllLessonsByCourseId(courseId).stream()
                .map(lesson -> lessonConverter.createFrom(lesson)).collect(Collectors.toList());
    }


    @IsCourseOwner
    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable Integer id) {
        this.courseService.deleteCourse(id);
    }

    @IsCourseOwner
    @PutMapping("/{id}")
    public ResponseEntity<CourseDTO> updateCourse(@PathVariable Integer id, @Valid @RequestBody CourseDTO courseDTO) {
        Course course = this.courseConverter.createFrom(courseDTO);
        course.setId(id);
        return ResponseEntity.ok(this.courseConverter.createFrom(this.courseService.updateCourse(course)));
    }

    @IsStudent
    @PostMapping("{id}/enroll")
    public ResponseEntity<CourseDTO> enroll(@PathVariable Integer id) {
        return ResponseEntity.ok(this.courseConverter.createFrom(this.courseService.enrollStudent(id)));
    }



//    @IsCourseOwner
//    @PostMapping("/{id}/lessons")
//    public ResponseEntity<LessonDTO> createLesson(@PathVariable Integer id, @RequestBody LessonDTO lessonDTO) {
//        return ResponseEntity.ok(
//                this.lessonConverter.createFrom(
//                        this.lessonService.createLesson(
//                                id, this.lessonConverter.createFrom(lessonDTO)))
//        );
//    }

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
