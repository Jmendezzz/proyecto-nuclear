package co.edu.cue.proyectonuclear.mapping.dtos;

import co.edu.cue.proyectonuclear.domain.enums.Role;

public record UserDTO(
        Long id,

        String nid,

        String name,

        String lastName,

        Role role,

        String email

) {
}
