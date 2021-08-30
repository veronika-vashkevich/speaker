package com.speakmast.backend.dtos;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

public abstract class DTO {

    @NotNull
    @Length(max = 32, min = 1)
    private String name;
}
