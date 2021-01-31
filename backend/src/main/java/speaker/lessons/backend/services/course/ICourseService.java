package speaker.lessons.backend.services.course;

import speaker.lessons.backend.models.Course;

import java.util.Collection;

public interface ICourseService {
    Collection<Course> getAllCourses();
    Collection<Course> getAllCoursesByUserId();

    Course getCourseById(Integer id);

    Course addCourse(Course course);

    void deleteCourse(Integer id);

    Course updateCourse(Course course);

    Course enrollStudent(Integer courseId);
}
