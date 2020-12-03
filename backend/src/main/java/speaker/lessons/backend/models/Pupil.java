package speaker.lessons.backend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import speaker.lessons.backend.models.generic.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "pupils")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Pupil extends BaseEntity {

    @OneToMany(mappedBy = "parent", fetch = FetchType.EAGER)
    private Set<Parent> parent;
    
    @OneToMany(mappedBy = "course", fetch = FetchType.EAGER)
    private Set<Course> course;

    @OneToMany(mappedBy = "teacher", fetch = FetchType.EAGER)
    private Teacher teacher;
    
    @Column(name = "rank")
    private String rank;

    @Column(name = "notes")
    private String notes;
    

}
