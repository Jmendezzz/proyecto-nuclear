package co.edu.cue.proyectonuclear.services;

import co.edu.cue.proyectonuclear.domain.entities.Classroom;
import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.domain.enums.Element;
import co.edu.cue.proyectonuclear.infrastructure.dao.ClassroomDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseDTO;

import java.util.List;
import java.util.Optional;

public interface ClassroomService {

    ClassroomDTO saveClassroom(ClassroomDTO classroom);
    List<ClassroomDTO> getAllClassroom();
    Optional<ClassroomDTO>getClassroomById(Long id);


}
