package speaker.lessons.backend.models.authorization;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "user_authority",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "authority_id"},
                name = "USER_AUTHORITY_UNIQUE_USER_ID_AND_AUTHORITY_ID"))
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_USER_AUTHORITY_USER_ID"))
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "authority_id", foreignKey = @ForeignKey(name = "FK_USER_AUTHORITY_AUTHORITY_ID"))
    private Authority authority;

    public UserAuthority(User user, Authority authority) {
        this.user = user;
        this.authority = authority;
    }
}
