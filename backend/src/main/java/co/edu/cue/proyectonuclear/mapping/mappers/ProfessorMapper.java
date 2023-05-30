package co.edu.cue.proyectonuclear.mapping.mappers;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProfessorMapper {
    ProfessorDTO mapFrom(Professor source);
    Professor mapFrom(ProfessorDTO source);
    @Mapping(target = "password", source = "professorRequestDTO.nid")
    @Mapping(target = "role", expression = "java(co.edu.cue.proyectonuclear.domain.enums.Role.PROFESSOR)")
    Professor mapFromDTO(CreateProfessorRequestDTO professorRequestDTO);
}
