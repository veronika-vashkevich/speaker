package speaker.lessons.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import speaker.lessons.backend.controllers.responses.ApiResponse;
import speaker.lessons.backend.controllers.responses.JwtAuthenticationResponse;
import speaker.lessons.backend.dtos.IDTOConverter;
import speaker.lessons.backend.models.authorization.Authority;
import speaker.lessons.backend.models.authorization.User;
import speaker.lessons.backend.dtos.authentication.LoginDTO;
import speaker.lessons.backend.dtos.authentication.RegisterConverter;
import speaker.lessons.backend.dtos.authentication.RegisterDTO;

import speaker.lessons.backend.models.authorization.UserAuthority;
import speaker.lessons.backend.services.user.IUserService;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;

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
