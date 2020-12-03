package speaker.lessons.backend.models;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import speaker.lessons.backend.models.lesson.Lesson;
import speaker.lessons.backend.models.authorization.User;
import speaker.lessons.backend.models.generic.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.*;

@Builder
@Entity
@Table(name = "courses")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    
    @Column(name = "name", nullable = false)
    @NotNull
    @Size(min = 4, max = 32)
    private String name;

    @Column(name = "description", nullable = false)
    @NotNull
    private String description;

    @Column(name = "createdDate", nullable = false, updatable = false)
    @CreatedDate
    private Date createdDate;

    @Column(name = "modifiedDate")
    @LastModifiedDate
    private Date modifiedDate;

    @ManyToOne
    @JoinColumn(name = "teacher", nullable = false)
    private Teacher teacher;

    @OneToMany(mappedBy = "pupil")
    private Set<Enrollment> pupils = new HashSet<>();

    @OneToMany(mappedBy = "course")
    @OrderBy("orderIndex asc")
    private List<Lesson> lessons = new ArrayList<>();
}
