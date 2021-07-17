package com.speakmast.backend.dtos.authentication;

import lombok.Getter;
import org.hibernate.validator.constraints.Length;
import com.speakmast.backend.dtos.DTO;
import com.speakmast.backend.models.authorization.AuthorityType;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

/**
 * Maps the Register payload to User class
 */
@Getter
public class RegisterDTO extends DTO {

    @NotNull
    @Length(max = 32, min = 1)
    private String name;

    @Email
    private String email;

    @NotNull
    @Length(max = 16, min = 6)
    private String password;

    @NotNull
    private AuthorityType authority;
}
