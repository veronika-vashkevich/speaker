package com.speakmast.backend.repositories;

import com.speakmast.backend.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {

    Collection<Course> getAllCoursesByUserId(int userId);
}
