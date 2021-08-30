package com.speakmast.backend.models.generic;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@MappedSuperclass
@Getter
@Setter
public class BaseEntity {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id")
//    private Integer id;
//
//    @Column(name = "username")
//    @NotNull
//    private String username;
//
//
//    @Column(name = "email")
//    @NotNull
//    private String email;
}
