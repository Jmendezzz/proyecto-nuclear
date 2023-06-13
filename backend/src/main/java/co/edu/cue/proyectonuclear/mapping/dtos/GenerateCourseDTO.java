package co.edu.cue.proyectonuclear.mapping.dtos;

import java.time.LocalDate;
import java.util.List;

public record GenerateCourseDTO(
        ProfessorDTO professor,
        SubjectDTO subject,
        List<StudentDTO> students,
        List<GenerateCourseScheduleDTO> courseSchedule,
        LocalDate startDate,
        LocalDate endDate
) {
}
