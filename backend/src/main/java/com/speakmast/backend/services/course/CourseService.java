package com.speakmast.backend.services.course;

import com.speakmast.backend.controllers.exceptions.course.CourseException;
import com.speakmast.backend.models.Course;
import com.speakmast.backend.models.Enrollment;
import com.speakmast.backend.repositories.CourseRepository;
import com.speakmast.backend.repositories.EnrollmentRepository;
import com.speakmast.backend.repositories.UserRepository;
import com.speakmast.backend.services.security.ISecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.speakmast.backend.models.authorization.User;

import javax.transaction.Transactional;
import java.util.Collection;

@Service
public class CourseService implements ICourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final ISecurityService securityService;
    private final EnrollmentRepository enrollmentRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository,
                         UserRepository userRepository,
                         ISecurityService securityService,
                         EnrollmentRepository enrollmentRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.securityService = securityService;
        this.enrollmentRepository = enrollmentRepository;
    }

    public Collection<Course> getAllCourses() {
        return this.courseRepository.findAll();
    }

    public Collection<Course> getAllCoursesByUserId() {
        int userId = securityService.getCurrentUser()
                .orElseThrow(() -> new CourseException("Trying to get current user returned Optional.empty()."))
                .getId();

        return this.courseRepository.getAllCoursesByUserId(userId);
    }

    @Override
    public Course getCourseById(Integer id) {
        return this.courseRepository.findById(id).orElseThrow(() -> new CourseException("Course not found!"));
    }

    @Override
    @Transactional
    public Course addCourse(Course course) throws CourseException {
        int userId = securityService.getCurrentUser()
                .orElseThrow(() -> new CourseException("Trying to get current user returned Optional.empty()."))
                .getId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CourseException(String.format("Failed to find user with id=%d.", userId)));

        //course.setUser(user);
        return courseRepository.save(course);
    }

    @Override
    @Transactional
    public void deleteCourse(Integer id) {
        if (this.courseRepository.existsById(id)) {
            this.enrollmentRepository.deleteAllByCourseId(id);
            this.courseRepository.deleteById(id);
        } else {
            throw new CourseException(("Course not found!"));
        }
    }

    @Override
    @Transactional
    public Course updateCourse(Course course) {
        int userId = courseRepository
                .findById(course.getId())
                .orElseThrow(() -> new CourseException("Course cannot be not found."))
                .getUserId();

        course.setUserId(userId);
        return courseRepository.save(course);
    }

    @Override
    @Transactional
    public Course enrollStudent(Integer courseId) {
        if (!this.courseRepository.existsById(courseId)) {
            throw new CourseException("Course not found!");
        }

        Course course = courseRepository.findById(courseId).orElseThrow(() -> new CourseException("Course not found!"));

        int userId = securityService.getCurrentUser()
                .orElseThrow(() -> new CourseException("Trying to get current user returned Optional.empty()."))
                .getId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CourseException(String.format("Failed to find user with id=%d.", userId)));

        if (course.getUserId() == userId) {
            throw new CourseException("You are the owner of the course!" +
                    " You cannot enlist to your own course! Who would teach it? :P");
        }

        if (enrollmentRepository.findByCourseIdInAndUserId(courseId, userId) != null) {
            throw new CourseException(String.format("User already enrolled in course with id=%d.", userId));
        }

        this.enrollmentRepository.save(new Enrollment(course, user));

        return course;
    }
}
