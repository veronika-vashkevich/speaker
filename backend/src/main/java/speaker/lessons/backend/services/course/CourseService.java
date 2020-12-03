package speaker.lessons.backend.services.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import speaker.lessons.backend.controllers.exceptions.course.CourseException;
import speaker.lessons.backend.models.Course;
import speaker.lessons.backend.models.Enrollment;
import speaker.lessons.backend.models.Pupil;
import speaker.lessons.backend.models.Teacher;
import speaker.lessons.backend.models.authorization.User;
import speaker.lessons.backend.repositories.CourseRepository;
import speaker.lessons.backend.repositories.EnrollmentRepository;
import speaker.lessons.backend.repositories.PupilRepository;
import speaker.lessons.backend.repositories.TeacherRepository;
import speaker.lessons.backend.repositories.UserRepository;
import speaker.lessons.backend.services.security.ISecurityService;

import javax.transaction.Transactional;
import java.util.Collection;

@Service
public class CourseService implements ICourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final PupilRepository pupilRepository;
    private final TeacherRepository teacherRepository;
    private final ISecurityService securityService;
    private final EnrollmentRepository enrollmentRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository, 
                         UserRepository userRepository, 
                         ISecurityService securityService, 
                         EnrollmentRepository enrollmentRepository, 
                         TeacherRepository teacherRepository,
                         PupilRepository pupilRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.securityService = securityService;
        this.enrollmentRepository = enrollmentRepository;
        this.teacherRepository = teacherRepository;
        this.pupilRepository = pupilRepository;
    }

    public Collection<Course> getAllCourses() {
        return this.courseRepository.findAll();
    }

    @Override
    public Course getCourseById(Integer id) {
        return this.courseRepository.findById(id).orElseThrow(() -> new CourseException("Course not found!"));
    }

    @Override
    @Transactional
    public Course addCourse(Course course) throws CourseException {
        int teacherId = securityService.getCurrentUser()
                .orElseThrow(() -> new CourseException("Trying to get current user returned Optional.empty()."))
                .getId();

        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new CourseException(String.format("Failed to find user with id=%d.", teacherId)));

        course.setTeacher(teacher);
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
        Teacher teacher = courseRepository
                .findById(course.getId())
                .orElseThrow(() -> new CourseException("Course cannot be not found."))
                .getTeacher();

        course.setTeacher(teacher);
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

        Pupil pupil = pupilRepository.findById(userId)
                .orElseThrow(() -> new CourseException(String.format("Failed to find user with id=%d.", userId)));

        if (course.getTeacher().getId() == userId) {
            throw new CourseException("You are the owner of the course!" +
                    " You cannot enlist to your own course! Who would teach it? :P");
        }

        if (enrollmentRepository.findByCourseIdInAndUserId(courseId, userId) != null) {
            throw new CourseException(String.format("User already enrolled in course with id=%d.", userId));
        }

        this.enrollmentRepository.save(new Enrollment(course, pupil));

        return course;
    }
}
