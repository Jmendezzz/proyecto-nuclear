package co.edu.cue.proyectonuclear.mapping.dtos;

import co.edu.cue.proyectonuclear.domain.entities.CourseSchedule;
import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.domain.entities.Student;
import co.edu.cue.proyectonuclear.domain.entities.Subject;

import java.util.List;

public record CourseDTO(
        Long id,
        Professor professor,
        Subject subject,
        List<Student>students,
        List<CourseSchedule> courseSchedule


) {
}
