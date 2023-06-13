package co.edu.cue.proyectonuclear.mapping.mappers;

import co.edu.cue.proyectonuclear.domain.entities.ProfessorSchedule;
import co.edu.cue.proyectonuclear.domain.entities.TimeSlot;
import co.edu.cue.proyectonuclear.domain.enums.DayOfWeek;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorScheduleDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-11T21:03:12-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.7 (Amazon.com Inc.)"
)
@Component
public class ProfessorScheduleMapperImpl implements ProfessorScheduleMapper {

    @Override
    public ProfessorScheduleDTO mapFromEntity(ProfessorSchedule professorSchedule) {
        if ( professorSchedule == null ) {
            return null;
        }

        Long id = null;
        DayOfWeek day = null;
        List<TimeSlot> timeSlots = null;

        id = professorSchedule.getId();
        day = professorSchedule.getDay();
        List<TimeSlot> list = professorSchedule.getTimeSlots();
        if ( list != null ) {
            timeSlots = new ArrayList<TimeSlot>( list );
        }

        ProfessorScheduleDTO professorScheduleDTO = new ProfessorScheduleDTO( id, day, timeSlots );

        return professorScheduleDTO;
    }

    @Override
    public ProfessorSchedule mapFromDTO(ProfessorScheduleDTO professorScheduleDTO) {
        if ( professorScheduleDTO == null ) {
            return null;
        }

        ProfessorSchedule professorSchedule = new ProfessorSchedule();

        professorSchedule.setId( professorScheduleDTO.id() );
        professorSchedule.setDay( professorScheduleDTO.day() );
        List<TimeSlot> list = professorScheduleDTO.timeSlots();
        if ( list != null ) {
            professorSchedule.setTimeSlots( new ArrayList<TimeSlot>( list ) );
        }

        return professorSchedule;
    }
}
