package co.edu.cue.proyectonuclear.mapping.dtos;

import co.edu.cue.proyectonuclear.domain.entities.TimeSlot;
import co.edu.cue.proyectonuclear.domain.enums.DayOfWeek;

import java.util.List;

public record ProfessorScheduleDTO(
        Long id,
        DayOfWeek day,
        List<TimeSlot> timeSlots
) {
}
