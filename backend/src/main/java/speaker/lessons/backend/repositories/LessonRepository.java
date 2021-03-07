package speaker.lessons.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import speaker.lessons.backend.models.lesson.Lesson;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Integer> {

    List<Lesson> getAllLessonsByCourseId(Integer courseId);

    Lesson save(Lesson lesson);

    void deleteById(Integer lessonId);

    @Modifying
    @Query("update Lesson l set l.title = :title where l.id = :id")
    void updateLessonTitle(@Param(value = "id") Integer id, @Param(value = "title") String title);
}
