package com.speakmast.backend.repositories;

import com.speakmast.backend.models.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {

    List<Enrollment> deleteAllByCourseId(Integer CourseId);

    Enrollment findByCourseIdInAndUserId(int courseId, int userId);
}
