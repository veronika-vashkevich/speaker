package speaker.lessons.backend.services.user;

import speaker.lessons.backend.models.authorization.AuthorityType;
import speaker.lessons.backend.models.authorization.User;

public interface IUserService {
    String login(String email, String password);

    void register(User user, AuthorityType authority);
}
