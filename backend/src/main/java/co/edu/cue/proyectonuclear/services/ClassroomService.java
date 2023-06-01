package co.edu.cue.proyectonuclear.services;

import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;

import java.util.List;
import java.util.Optional;

public interface ClassroomService {


   ClassroomDTO saveClassroom(ClassroomDTO classroom);
    List<ClassroomDTO> getAllClassroom();
    Optional<ClassroomDTO> getClassroomById(Long id);//-
    ClassroomDTO updateClassroom(Long id, ClassroomDTO classroomDTO);


    ClassroomDTO deleteClassroom(Long id);
}
