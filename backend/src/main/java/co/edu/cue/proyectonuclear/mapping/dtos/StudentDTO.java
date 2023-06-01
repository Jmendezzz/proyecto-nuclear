package co.edu.cue.proyectonuclear.mapping.dtos;

import co.edu.cue.proyectonuclear.domain.entities.Subject;
import co.edu.cue.proyectonuclear.domain.enums.Career;

import java.util.List;

public record StudentDTO(
        Long id,
        String nid,
        String name,
        String lastName,
        String email,
        Career career,
        Integer semester,
        List<Subject> subjects) {
}
