package speaker.lessons.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import speaker.lessons.backend.models.lesson.Lesson;

import java.util.List;
import java.util.Optional;


@Repository
public interface LessonRepository extends JpaRepository<Lesson, Integer> {
//    Optional<Lesson> findByCourseIdAndOrderIndex(Integer courseId, Integer orderIndex);
    List<Lesson> findAllLessonsByUserId(Integer userId);
}
