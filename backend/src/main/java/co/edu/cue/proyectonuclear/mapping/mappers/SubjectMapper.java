package co.edu.cue.proyectonuclear.mapping.mappers;

import co.edu.cue.proyectonuclear.domain.entities.Subject;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SubjectMapper {
    SubjectDTO mapFrom(Subject source);
    Subject mapFrom(SubjectDTO source);
}
