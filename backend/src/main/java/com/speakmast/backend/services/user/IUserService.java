package com.speakmast.backend.services.user;

import com.speakmast.backend.models.authorization.AuthorityType;
import com.speakmast.backend.models.authorization.User;

public interface IUserService {
    String login(String email, String password);

    void register(User user);

    AuthorityType getUserAuthorityBy(String email);

}
