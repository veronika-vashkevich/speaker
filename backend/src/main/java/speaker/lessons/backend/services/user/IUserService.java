package speaker.lessons.backend.services.user;

import speaker.lessons.backend.models.authorization.Authority;
import speaker.lessons.backend.models.authorization.AuthorityType;
import speaker.lessons.backend.models.authorization.User;
import speaker.lessons.backend.models.authorization.UserAuthority;

import java.util.Set;

public interface IUserService {
    String login(String email, String password);

    void register(User user, AuthorityType authority);

    Authority getUserAuthorityBy(String email);

}
