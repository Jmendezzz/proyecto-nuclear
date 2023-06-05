package co.edu.cue.proyectonuclear.services;

import co.edu.cue.proyectonuclear.domain.enums.Location;
import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;

import java.util.List;
import java.util.Optional;

public interface ClassroomService {


   ClassroomDTO saveClassroom(ClassroomDTO classroom);
    List<ClassroomDTO> getAllClassroom();
    Optional<ClassroomDTO> getClassroomById(Long id);//-
    ClassroomDTO updateClassroom(ClassroomDTO classroomDTO);
    ClassroomDTO deleteClassroom(Long id);
    List<ClassroomDTO> searchByCapacity(Integer capability);
 List<ClassroomDTO> searchByLocation(Location location);
}

