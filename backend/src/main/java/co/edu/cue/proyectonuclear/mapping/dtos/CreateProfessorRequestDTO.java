package co.edu.cue.proyectonuclear.mapping.dtos;

import co.edu.cue.proyectonuclear.domain.entities.ProfessorSchedule;
import co.edu.cue.proyectonuclear.domain.entities.Subject;
import co.edu.cue.proyectonuclear.domain.enums.Role;
import jakarta.persistence.*;

import java.util.List;

public record CreateProfessorRequestDTO(
        Long id,
        String name,
        String lastName,
        Role role,
        String email,
        String password,
        List<Subject> subjects //TODO: Preguntar si esto es válido o toca crear un DTO para esto. (subjects).
) {
}
