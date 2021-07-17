package com.speakmast.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.speakmast.backend.models.authorization.Authority;
import com.speakmast.backend.models.authorization.AuthorityType;

import java.util.Optional;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Integer> {
    Optional<Authority> findByName(AuthorityType name);

    Optional<Authority> findById(int id);
}
