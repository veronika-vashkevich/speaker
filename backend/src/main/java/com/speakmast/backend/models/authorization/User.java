package com.speakmast.backend.models.authorization;

import com.speakmast.backend.models.generic.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "user_account")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseEntity {

    @Column
    private String password;

    @Column(name = "account_expired")
    private Boolean accountExpired = false;

    @Column(name = "account_locked")
    private Boolean accountLocked = false;

    @Column(name = "credentials_expired")
    private Boolean credentialsExpired = false;

    @Column(name = "authority_id")
    private int authorityId;

    @Column
    private Boolean enabled;


    @OneToMany(mappedBy = "user", targetEntity = UserAuthority.class, cascade = {
            CascadeType.ALL}, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<UserAuthority> userAuthorities = new HashSet<>();

//    @OneToMany(mappedBy = "user")
//    private Set<Enrollment> enrollments;

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private Set<Course> courses;

    public User(/*String name, String email,*/ String password) {
//        this.name = name;
//        this.email = email;
        this.password = password;
    }
}
