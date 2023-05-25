package co.edu.cue.proyectonuclear.mapping.dtos;

import co.edu.cue.proyectonuclear.domain.entities.ProfessorSchedule;
import co.edu.cue.proyectonuclear.domain.entities.Subject;

import java.util.List;

public record ProfessorDTO(
        Long id,
        String name,
        List<ProfessorSchedule> schedule,
        List<Subject> subjects
) {
}
