package speaker.lessons.backend.models.ppt;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class CreatePptRequest {
    @JsonProperty("title")
    private String title = null;
}
