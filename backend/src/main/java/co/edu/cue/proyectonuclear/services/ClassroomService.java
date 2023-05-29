package co.edu.cue.proyectonuclear.services;

import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;

import java.util.List;
import java.util.Optional;

public interface ClassroomService {


   Optional<ClassroomDTO> saveClassroom(ClassroomDTO classroom);
    List<ClassroomDTO> getAllClassroom();
    Optional<ClassroomDTO> getClassroomById(Long id);
    Optional<ClassroomDTO> updateClassroom(Long id, ClassroomDTO classroomDTO);


    Optional<ClassroomDTO> deleteClassroom(Long id);
}
