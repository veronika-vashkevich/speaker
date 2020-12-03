package speaker.lessons.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import speaker.lessons.backend.models.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
}
