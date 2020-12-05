package speaker.lessons.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import speaker.lessons.backend.models.Enrollment;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {

    List<Enrollment> deleteAllByCourseId(Integer CourseId);

    Enrollment findByCourseIdInAndUserId(int courseId, int userId);
}
