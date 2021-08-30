package com.speakmast.backend.models;

import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import com.speakmast.backend.models.authorization.User;
import com.speakmast.backend.models.generic.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "enrollments")
@Getter
@Setter
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Enrollment extends BaseEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "course_id")
    @NotNull
    private Integer  courseId;

    @Column(name = "user_id")
    @NotNull
    private Integer userId;
}
