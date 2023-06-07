package co.edu.cue.proyectonuclear.mapping.mappers;


import co.edu.cue.proyectonuclear.domain.entities.ProfessorSchedule;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorScheduleDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProfessorScheduleMapper {

    ProfessorScheduleDTO mapFromEntity(ProfessorSchedule professorSchedule);

    ProfessorSchedule mapFromDTO(ProfessorScheduleDTO professorScheduleDTO);
}
