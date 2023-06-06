package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.domain.entities.Classroom;
import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.domain.enums.Location;
import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;

import java.util.List;
import java.util.Optional;

public interface ClassroomDAO {
   ClassroomDTO saveClassroom(ClassroomDTO classroomDTO);
    List<ClassroomDTO> getAllClassrrom();

    ClassroomDTO updateClassroom(ClassroomDTO classroomDTO);

   Optional<ClassroomDTO> getClassroomById(Long id);


    ClassroomDTO deleteClassroomById(Long id);
    List<ClassroomDTO> searchByCapacity(Integer capability);
    List<ClassroomDTO> searchByLocation(Location location);
}
