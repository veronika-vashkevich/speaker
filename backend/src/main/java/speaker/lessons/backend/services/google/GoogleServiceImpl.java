package speaker.lessons.backend.services.google;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.slides.v1.Slides;
import com.google.api.services.slides.v1.SlidesScopes;
import com.google.api.services.slides.v1.model.Presentation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import speaker.lessons.backend.dtos.lesson.LessonDTO;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Collections;
import java.util.List;

//import com.google.api.services.analytics.AnalyticsScopes;

@RequiredArgsConstructor
@Service
public class GoogleServiceImpl implements GoogleService {

    private static final String APPLICATION_NAME = "Speakmast";
    private final RestTemplate restTemplate;
    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    private static final String TOKENS_DIRECTORY_PATH = "tokens";
    private static final List<String> SCOPES = Collections.singletonList(SlidesScopes.PRESENTATIONS);
    private static final String CREDENTIALS_FILE_PATH = "/credentials/credentials.json";

    private static Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT) throws IOException {
        // Load client secrets.
        InputStream in = GoogleServiceImpl.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
        if (in == null) {
            throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
        }
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        // Build flow and trigger user authorization request.
        GoogleAuthorizationCodeFlow flow =
                new GoogleAuthorizationCodeFlow.Builder(HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                        .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                        .setAccessType("offline").build();
        LocalServerReceiver receiver = new LocalServerReceiver.Builder().build();
        return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
    }

    @Override
    public String createPptUrl(LessonDTO lessonDTO) {
        Presentation presentation;
        try {
            final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
            Slides service = new Slides.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
                    .setApplicationName(APPLICATION_NAME).build();

            presentation = new Presentation().setTitle(generateTitleFrom(lessonDTO));
            presentation = service.presentations().create(presentation).setFields("presentationId").execute();

        } catch (Exception e) {
            System.err.println(e);
            presentation = null;
        }
        if (presentation == null) {
            return "not_exist";
        }

        return presentation.getPresentationId();
    }

    @Override
    public String createViewPptUrl(String presentationId) {
        return "https://docs.google.com/presentation/d/"+presentationId+"/preview";
    }

    @Override
    public String crateUpdatePptUrl(String presentationId) {
        return "https://docs.google.com/presentation/d/"+presentationId+"/edit#slide=id.p";
    }


    private String generateTitleFrom(LessonDTO lessonDTO) {
        return "Урок " + lessonDTO.getOrderIndex() + ". " + lessonDTO.getTitle() + ".pptx ";
    }

}
