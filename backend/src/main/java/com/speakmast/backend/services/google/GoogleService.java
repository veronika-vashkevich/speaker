package com.speakmast.backend.services.google;

import com.speakmast.backend.dtos.lesson.LessonDTO;

public interface GoogleService {
    String createPptUrl(LessonDTO lessonDTO);
    String createViewPptUrl (String presentationId);
    String crateUpdatePptUrl(String presentationId);
    void deletePptByUrl(String pptUrt);
}
