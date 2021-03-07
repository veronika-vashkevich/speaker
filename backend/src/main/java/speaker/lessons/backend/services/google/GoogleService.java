package speaker.lessons.backend.services.google;

import speaker.lessons.backend.dtos.lesson.LessonDTO;

public interface GoogleService {
    String createPptUrl(LessonDTO lessonDTO);
    String createViewPptUrl (String presentationId);
    String crateUpdatePptUrl(String presentationId);
    void deletePptByUrl(String pptUrt);
}
