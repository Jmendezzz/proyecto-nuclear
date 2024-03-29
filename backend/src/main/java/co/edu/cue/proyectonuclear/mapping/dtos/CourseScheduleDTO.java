package co.edu.cue.proyectonuclear.mapping.dtos;

import co.edu.cue.proyectonuclear.domain.entities.TimeSlot;
import co.edu.cue.proyectonuclear.domain.enums.DayOfWeek;


public record CourseScheduleDTO(
        Long id,
        ClassroomDTO classroom,
        DayOfWeek day,
        TimeSlot timeSlot
) {
}
