package speaker.lessons.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import speaker.lessons.backend.models.Course;

import java.util.Collection;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {

    Collection<Course> getAllCoursesByUserId(int userId);
}
