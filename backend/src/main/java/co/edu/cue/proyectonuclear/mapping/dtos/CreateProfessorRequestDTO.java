package co.edu.cue.proyectonuclear.mapping.dtos;

import co.edu.cue.proyectonuclear.domain.entities.Subject;
import jakarta.validation.constraints.Email;


import java.util.List;

public record CreateProfessorRequestDTO(
        Long id,
        String nid,
        String name,
        String lastName,
        @Email(message = "The email should be valid")
        String email,
        List<CreateProfessorRequestSubjectDTO> subjects //TODO: Preguntar si esto es válido o toca crear un DTO para esto. (subjects).
) {
}
