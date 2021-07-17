package com.speakmast.backend.dtos;

import com.speakmast.backend.models.generic.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
