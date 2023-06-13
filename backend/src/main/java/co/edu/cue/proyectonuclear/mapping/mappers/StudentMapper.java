package co.edu.cue.proyectonuclear.mapping.mappers;

import co.edu.cue.proyectonuclear.domain.entities.Student;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateStudentRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.StudentDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StudentMapper {
    StudentDTO mapFromEntity(Student student);
    Student mapFromDTO(StudentDTO studentDTO);

    List<StudentDTO> mapFrom(List<Student> students);
    List<Student> mapFromListDTO(List<StudentDTO> students);

    @Mapping(target = "password", source = "studentRequestDTO.id") //La password va ser la identificacion.
    @Mapping(target = "role",expression = "java(co.edu.cue.proyectonuclear.domain.enums.Role.STUDENT)") // Indico que el campo role va a ser una expression importando el role manualmente.
    @Mapping(target = "username", source = "studentRequestDTO.nid")
    Student mapFromDTO(CreateStudentRequestDTO studentRequestDTO);
}
