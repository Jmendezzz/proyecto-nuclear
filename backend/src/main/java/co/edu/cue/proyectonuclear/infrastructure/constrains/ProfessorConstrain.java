package co.edu.cue.proyectonuclear.infrastructure.constrains;


import co.edu.cue.proyectonuclear.domain.entities.Subject;
import co.edu.cue.proyectonuclear.domain.entities.TimeSlot;
import co.edu.cue.proyectonuclear.domain.enums.Period;
import co.edu.cue.proyectonuclear.exceptions.ProfessorException;
import co.edu.cue.proyectonuclear.exceptions.UserException;
import co.edu.cue.proyectonuclear.infrastructure.dao.ProfessorDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestSubjectDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorScheduleDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class ProfessorConstrain {
    private final ProfessorDAO professorDAO;
    public void  validateSubjects(List<CreateProfessorRequestSubjectDTO> subjects){
        subjects.forEach(s->{
            if (professorDAO.getProfessorBySubject(s.id()).isPresent()) {
                System.out.println(s.name());
                throw new UserException("La materia "+ s.name() + " ya cuenta con profesor", HttpStatus.BAD_REQUEST);
            }
        });
    }

    public void validateTimeSlotsByProfessorSubject(ProfessorScheduleDTO professorScheduleDTO) {
        List<TimeSlot> timeSlots = professorScheduleDTO.timeSlots();
        //order the list by startTime
        timeSlots.sort(Comparator.comparing(TimeSlot::getStartTime));
        //Validate the gap between the startTime and the endTime
        validateGapBetweenTimeSlots(timeSlots);
        //Validate that there is not timeSlots with the same startTime or endTime
        validateEqualTimeSlots(timeSlots);
        //Validate that there are not overlapping timeSlots
        validateOverlappingTimeSlots(timeSlots);
    }
    public void validateEqualTimeSlots(List<TimeSlot> timeSlots){
        for (int i = 1; i < timeSlots.size(); i++) {
            TimeSlot currentTimeSlot = timeSlots.get(i);
            TimeSlot previousTimeSlot = timeSlots.get(i - 1);
            if (currentTimeSlot.getStartTime().equals(previousTimeSlot.getEndTime())) {
                throw new ProfessorException("No pueden haber campos iguales", HttpStatus.BAD_REQUEST);
            }
        }
    }

    public void validateOverlappingTimeSlots (List<TimeSlot> timeSlots) {
        boolean hasOverlappingTimeSlots = timeSlots.stream().anyMatch(currentTimeSlot ->
                timeSlots.stream().anyMatch(otherTimeSlot ->
                        !currentTimeSlot.equals(otherTimeSlot) &&
                                currentTimeSlot.getStartTime().isAfter(otherTimeSlot.getStartTime()) &&
                                currentTimeSlot.getEndTime().isBefore(otherTimeSlot.getEndTime())
                )
        );
        if (hasOverlappingTimeSlots) {
            throw new ProfessorException("No puede haber un intervalo contenido dentro de otro intervalo", HttpStatus.BAD_REQUEST);
        }
    }

    public void validateGapBetweenTimeSlots(List<TimeSlot> timeSlots) {
        timeSlots.forEach(timeSlot -> {
            if (ChronoUnit.HOURS.between( timeSlot.getStartTime(), timeSlot.getEndTime()) <= 1) {
                throw new ProfessorException("La disponibilidad debe ser de al menos 2 horas", HttpStatus.BAD_REQUEST);
            }
        });
    }
}
