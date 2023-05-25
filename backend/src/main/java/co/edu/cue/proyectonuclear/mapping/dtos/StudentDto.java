package co.edu.cue.proyectonuclear.mapping.dtos;

import co.edu.cue.proyectonuclear.domain.entities.Subject;
import co.edu.cue.proyectonuclear.domain.enums.Career;

import java.util.List;

public record StudentDto(
        List<Subject> subjects,
        Integer semester,
        Career career
) {
}
