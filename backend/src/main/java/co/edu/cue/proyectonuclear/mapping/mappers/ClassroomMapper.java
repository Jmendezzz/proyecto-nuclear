package co.edu.cue.proyectonuclear.mapping.mappers;

import co.edu.cue.proyectonuclear.domain.entities.Classroom;
import co.edu.cue.proyectonuclear.domain.entities.Subject;
import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ClassroomMapper {
    ClassroomDTO mapFromEntity(Classroom classroom);//mapea los atributos de la entidad classroom a los atributos DTO

    Classroom mapFromDTO(ClassroomDTO classroomDTO);//mapea los atributos DTO a los atributos de la entidad classroom

}
