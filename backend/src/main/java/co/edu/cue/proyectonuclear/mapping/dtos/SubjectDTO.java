package co.edu.cue.proyectonuclear.mapping.dtos;

import co.edu.cue.proyectonuclear.domain.enums.Career;

public record SubjectDTO(
        Long id,
        String name,
        Career career,
        Integer semester,
        Integer credits
) {
}
