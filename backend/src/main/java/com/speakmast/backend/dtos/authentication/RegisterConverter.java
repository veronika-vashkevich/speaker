package com.speakmast.backend.dtos.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.speakmast.backend.dtos.IDTOConverter;
import com.speakmast.backend.models.authorization.User;

@Component
public class RegisterConverter implements IDTOConverter<RegisterDTO, User> {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public RegisterConverter(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public RegisterDTO createFrom(User entity) {
        return null;
    }

    @Override
    public User createFrom(RegisterDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        return user;
    }
}
