package speaker.lessons.backend.services.security;

import lombok.val;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import speaker.lessons.backend.models.Course;
import speaker.lessons.backend.models.authorization.AuthorityType;
import speaker.lessons.backend.models.authorization.User;
import speaker.lessons.backend.models.generic.BaseEntity;
import speaker.lessons.backend.repositories.CourseRepository;
import speaker.lessons.backend.repositories.UserRepository;
import speaker.lessons.backend.security.UserPrincipal;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SecurityService implements ISecurityService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final Logger logger = LoggerFactory.getLogger(SecurityService.class);

    public SecurityService(UserRepository userRepository, CourseRepository courseRepository) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    @Override
    public Optional<UserPrincipal> getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserPrincipal) {
            return Optional.of((UserPrincipal) principal);
        }

        return Optional.empty();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Optional<UserPrincipal> optionalUser = getCurrentUser();

        if (optionalUser.isEmpty()) {
            /* Return an empty immutable list. */
            return Collections.emptyList();
        }

        return optionalUser.get().getAuthorities();
    }

    @Override
    public boolean isTeacher() {
        return this.getAuthorities()
                .stream()
                .anyMatch(authority -> authority.getAuthority().equals(AuthorityType.TEACHER.name()));
    }

    @Override
    public boolean isStudent() {
        return this.getAuthorities()
                .stream()
                .anyMatch(authority -> authority.getAuthority().equals(AuthorityType.STUDENT.name()));
    }

    @Override
    public boolean isCourseOwner(int courseId) {
        /* Pre-emptive return if the user is not a teacher. */
        if (!isTeacher()) {
            return false;
        }

        val optUser = getCurrentUser();
        if (optUser.isEmpty()) {
            return false;
        }

        UserPrincipal userPrincipal = optUser.get();
        int userId = userPrincipal.getId();

        User user = userRepository.getOne(userId);
        logger.info("isCourseOwner: user '{}' with for userId={} knocks at the door.", user.getName(), userId);

       Set<Course> courses = (Set<Course>) courseRepository.getAllCoursesByUserId(userId);

        logger.info(
                "isCourseTeacher: {}'s set of courses is {}.",
                user.getName(),
                courses.stream().map(course -> course.getId()).collect(Collectors.toList())
        );

        return courses.stream().anyMatch(c -> c.getId() == courseId);
    }
}
