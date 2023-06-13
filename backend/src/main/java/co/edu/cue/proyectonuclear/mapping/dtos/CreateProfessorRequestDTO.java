package co.edu.cue.proyectonuclear.mapping.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


import java.util.List;

public record CreateProfessorRequestDTO(
        @Size(message = "El nid debe tener una longitud entre 7 y 10",  min = 7, max = 10)
        String nid,
        @NotNull
        String name,
        @NotNull
        String lastName,
        @NotNull
        @Email(message = "El email debe ser válido")
        String email,
        List<CreateProfessorRequestSubjectDTO> subjects
) {
}
