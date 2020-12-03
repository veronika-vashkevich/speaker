package speaker.lessons.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import speaker.lessons.backend.models.Teacher;
import speaker.lessons.backend.models.authorization.User;

import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
    Optional<Teacher> findByEmail(String email);
    Optional<Teacher> findByFirstName(String firstName);

    Boolean existsByEmail(String email);
}

