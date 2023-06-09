package co.edu.cue.proyectonuclear.mapping.mappers;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.domain.entities.ProfessorSchedule;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorScheduleDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProfessorMapper {
    ProfessorDTO mapFrom(Professor source);
    Professor mapFrom(ProfessorDTO source);
    List<ProfessorDTO> mapFrom(List<Professor> professors);
    @Mapping(target = "password", source = "professorRequestDTO.nid")
    @Mapping(target = "role", expression = "java(co.edu.cue.proyectonuclear.domain.enums.Role.PROFESSOR)")
    @Mapping(target = "username", source = "professorRequestDTO.nid")
    Professor mapFromDTO(CreateProfessorRequestDTO professorRequestDTO);
    ProfessorSchedule mapFrom(ProfessorScheduleDTO professorScheduleDTO);
}
