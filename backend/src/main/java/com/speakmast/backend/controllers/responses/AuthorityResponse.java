package com.speakmast.backend.controllers.responses;

import com.speakmast.backend.models.authorization.AuthorityType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthorityResponse {

    private Boolean success;
    private AuthorityType authorityType;

}
