package co.edu.cue.proyectonuclear.mapping.dtos;

import co.edu.cue.proyectonuclear.domain.entities.Subject;
import co.edu.cue.proyectonuclear.domain.enums.Career;

import java.util.List;

public record StudentDTO(
        Long id,
        String name,
        String lastName,
        Career career,
        Integer semester,
        List<Subject> subjects) {
}
