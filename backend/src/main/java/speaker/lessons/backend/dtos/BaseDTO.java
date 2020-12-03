package speaker.lessons.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import speaker.lessons.backend.models.generic.BaseEntity;

/**
 * Base entity dto.
 * Used to map all entities that extend BaseEntity class
 *
 * @see BaseEntity
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BaseDTO extends DTO {
    private Integer id;
}
