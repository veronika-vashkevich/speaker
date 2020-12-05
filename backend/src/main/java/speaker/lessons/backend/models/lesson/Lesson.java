package speaker.lessons.backend.models.lesson;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import speaker.lessons.backend.models.Course;
import speaker.lessons.backend.models.authorization.User;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
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

    @Column(name = "order_index")
    @NotNull
    private Integer orderIndex;

    @Column(name = "title")
    @NotNull
    private String title;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "content")
    private String content;

    @Column(name = "url")
    private String url;

    @Column(name = "media_type")
    @NotNull
    @Enumerated(EnumType.STRING)
    private LessonType type;

    @Column(name = "date")
    private Timestamp date;
    
    
    @Column(name = "lesson_number")
    private int lessonNumber;

    @Column(name = "lessons_left")
    private int lessonsLeft;

    @Column(name = "lesson_mark")
    private String lessonMark;
    
    @Column(name = "notes")
    private String notes;

    @Column(name = "paid")
    private boolean paid;
    
    @Column(name = "pay_date")
    private Date payDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
