package com.speakmast.backend.controllers;

import com.speakmast.backend.dtos.IDTOConverter;
import com.speakmast.backend.dtos.authentication.LoginDTO;
import com.speakmast.backend.dtos.authentication.RegisterConverter;
import com.speakmast.backend.dtos.authentication.RegisterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.speakmast.backend.controllers.responses.ApiResponse;
import com.speakmast.backend.controllers.responses.JwtAuthenticationResponse;
import com.speakmast.backend.models.authorization.Authority;
import com.speakmast.backend.models.authorization.User;

import com.speakmast.backend.services.user.IUserService;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class UserController {

    private final IUserService userService;
    private final IDTOConverter<RegisterDTO, User> registerConverter;

    @Autowired
    public UserController(IUserService userService, RegisterConverter registerConverter) {
        this.userService = userService;
        this.registerConverter = registerConverter;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDTO) {
        String jwt = userService.login(loginDTO.getEmail(), loginDTO.getPassword());
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDTO registerDTO) {
        User user = registerConverter.createFrom(registerDTO);
        this.userService.register(user, registerDTO.getAuthority());

        return ResponseEntity.ok(new ApiResponse(true, "Successfully registered!"));
    }

    @GetMapping("/authority")
    public Authority userAuthorities(@RequestParam String email){
        return userService.getUserAuthorityBy(email);
    }
}
