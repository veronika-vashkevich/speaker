package speaker.lessons.backend.models.lesson;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import speaker.lessons.backend.models.Course;
import speaker.lessons.backend.models.Teacher;
import speaker.lessons.backend.models.generic.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "lessons")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Lesson  {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "orderIndex")
    @NotNull
    private Integer orderIndex;

    @Column(name = "title")
    @NotNull
    private String title;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course", nullable = false)
    private Course course;

    @Column(name = "content")
    private String content;

    @Column(name = "url")
    private String url;

    @Column(name = "mediaType")
    @NotNull
    @Enumerated(EnumType.STRING)
    private LessonType type;

    @Column(name = "date")
    private Timestamp date;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "teacher", nullable = false)
    private Teacher teacher;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pupil", nullable = false)
    private String pupil;

    @Column(name = "lessonNumber")
    private int lessonNumber;

    @Column(name = "lessonsLeft")
    private int lessonsLeft;

    @Column(name = "lessonMark")
    private String lessonMark;
    
    @Column(name = "notes")
    private String notes;

    @Column(name = "paid")
    private boolean paid;
    
    @Column(name = "payDate")
    private Date payDate;
    
}
