package co.edu.cue.proyectonuclear.mapping.dtos;

import co.edu.cue.proyectonuclear.domain.entities.Subject;
import co.edu.cue.proyectonuclear.domain.enums.Career;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record StudentDTO(
        Long id,
        @NotNull
        String nid,
        @NotNull
        String name,
        @NotNull
        String lastName,
        @NotNull
        String email,
        @NotNull
        Career career,
        @NotNull
        @Min(value = 1)
        Integer semester,
        @NotNull
        List<Subject> subjects) {
}
