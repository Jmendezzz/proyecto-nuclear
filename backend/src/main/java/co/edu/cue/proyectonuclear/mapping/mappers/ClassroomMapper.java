package co.edu.cue.proyectonuclear.mapping.mappers;

import co.edu.cue.proyectonuclear.domain.entities.Classroom;
import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ClassroomMapper {
    ClassroomDTO mapFromEntity(Classroom classroom);

    Classroom mapFromDTO(ClassroomDTO classroomDTO);

}
