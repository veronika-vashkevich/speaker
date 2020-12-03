package speaker.lessons.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import speaker.lessons.backend.models.Pupil;
import speaker.lessons.backend.models.authorization.User;

import java.util.Optional;

@Repository
public interface PupilRepository extends JpaRepository<Pupil, Integer> {
    Optional<Pupil> findByEmail(String email);

    Boolean existsByEmail(String email);
}

