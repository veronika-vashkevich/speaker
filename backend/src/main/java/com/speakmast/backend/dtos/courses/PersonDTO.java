package com.speakmast.backend.dtos.courses;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import com.speakmast.backend.dtos.BaseDTO;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class PersonDTO extends BaseDTO {

    private String name;

    private String email;

    public PersonDTO(Integer id, String name, String email) {
        super(id);
        this.name = name;
        this.email = email;
    }
}
