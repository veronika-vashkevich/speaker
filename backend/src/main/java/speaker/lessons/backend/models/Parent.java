package speaker.lessons.backend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import speaker.lessons.backend.models.Pupil;
import speaker.lessons.backend.models.authorization.Authority;
import speaker.lessons.backend.models.authorization.User;
import speaker.lessons.backend.models.authorization.UserAuthority;
import speaker.lessons.backend.models.generic.BaseEntity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "parents")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Parent extends BaseEntity {

    @OneToMany(mappedBy = "parent", targetEntity = Pupil.class, cascade = {
            CascadeType.ALL}, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<Pupil> pupils = new HashSet<>();
    
    @Column(name = "notes")
    private String notes;
    
}
