package co.edu.cue.proyectonuclear.mapping.dtos;

import java.util.List;

public record CourseUserRequestDTO(
        Long id,
        SubjectDTO subject,
        List<CourseScheduleDTO> courseSchedule


) {


}
