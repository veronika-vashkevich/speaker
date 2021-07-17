package com.speakmast.backend.dtos.lesson;

import com.speakmast.backend.models.Course;
import com.speakmast.backend.models.lesson.Lesson;
import com.speakmast.backend.models.lesson.LessonType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import com.speakmast.backend.dtos.courses.PersonDTO;
import com.speakmast.backend.dtos.BaseDTO;

import java.util.HashSet;
import java.util.Set;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class LessonDTO extends BaseDTO {
    private Integer orderIndex;
    private String title;
    private String content;
    private String url;
    private String pptUpdateUrl;
    private LessonType type;
    private Course course;
    private Integer courseId;
    private Set<PersonDTO> students = new HashSet<>();

    public LessonDTO(Lesson lesson) {
        super(lesson.getId());
        this.orderIndex = lesson.getOrderIndex();
        this.title = lesson.getTitle();
        this.content = lesson.getContent();
        this.url = lesson.getUrl();
        this.type = lesson.getType();
        this.course = lesson.getCourse();
        this.courseId = lesson.getCourse().getId();
        this.pptUpdateUrl = lesson.getPptUpdateUrl();
    }
}
