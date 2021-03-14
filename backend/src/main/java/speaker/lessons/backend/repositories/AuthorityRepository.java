package speaker.lessons.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import speaker.lessons.backend.models.authorization.Authority;
import speaker.lessons.backend.models.authorization.AuthorityType;

import java.util.Optional;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Integer> {
    Optional<Authority> findByName(AuthorityType name);

    Optional<Authority> findById(int id);
}
