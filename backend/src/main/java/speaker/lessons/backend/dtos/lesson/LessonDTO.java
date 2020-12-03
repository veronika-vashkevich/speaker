package speaker.lessons.backend.dtos.lesson;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import speaker.lessons.backend.models.lesson.Lesson;
import speaker.lessons.backend.models.lesson.LessonType;
import speaker.lessons.backend.dtos.BaseDTO;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class LessonDTO extends BaseDTO {
    private Integer orderIndex;
    private String title;
    private String content;
    private String url;
    private LessonType type;

    public LessonDTO(Lesson lesson) {
        super(lesson.getId());
        this.orderIndex = lesson.getOrderIndex();
        this.title = lesson.getTitle();
        this.content = lesson.getContent();
        this.url = lesson.getUrl();
        this.type = lesson.getType();
    }
}
