package com.speakmast.backend.services.user;

import com.speakmast.backend.controllers.exceptions.AppException;
import com.speakmast.backend.controllers.exceptions.user.EmailException;
import com.speakmast.backend.repositories.AuthorityRepository;
import com.speakmast.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.speakmast.backend.models.authorization.Authority;
import com.speakmast.backend.models.authorization.AuthorityType;
import com.speakmast.backend.models.authorization.User;
import com.speakmast.backend.security.JwtTokenProvider;

import javax.transaction.Transactional;

@Service
@Transactional
public class UserService implements IUserService {

    private final UserRepository userRepository;

    private final AuthorityRepository authorityRepository;

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider tokenProvider;

    @Autowired
    public UserService(UserRepository userRepository, AuthorityRepository authorityRepository,
                       AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }


    @Override
    public String login(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        email,
                        password
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return tokenProvider.generateToken(authentication);
    }

    @Override
    public void register(User user, AuthorityType authority) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailException("Email address already in use!");
        }

        Authority userAuthority = authorityRepository.findByName(authority)
                .orElseThrow(() -> new AppException("User authority not found."));

        //add a student authority for each registered user
        if (authority != AuthorityType.STUDENT) {
            Authority studentAuthority = authorityRepository.findByName(AuthorityType.STUDENT)
                    .orElseThrow(() -> new AppException("User authority not found."));
//
//            user.getUserAuthorities().add(new UserAuthority(user, studentAuthority));
        }
//        user.getUserAuthorities().add(new UserAuthority(user, userAuthority));

        userRepository.save(user);
    }

    @Override
    public Authority getUserAuthorityBy(String email) {
        int authorityId =  userRepository.findByEmail(email)
                .orElseThrow(RuntimeException::new)
                .getAuthorityId();

        return authorityRepository.findById(authorityId).get();

    }
}
