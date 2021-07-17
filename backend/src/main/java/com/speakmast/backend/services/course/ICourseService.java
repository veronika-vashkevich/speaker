package com.speakmast.backend.services.course;

import com.speakmast.backend.models.Course;

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
