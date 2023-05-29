package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;

import java.util.List;
import java.util.Optional;

public interface ClassroomDAO {
    Optional<ClassroomDTO> saveCourse(ClassroomDTO classroomDTO);
    List<ClassroomDTO> getAllClassrrom();

    Optional<ClassroomDTO> findCourseById(Long id);
    Optional<ClassroomDTO> updateClassroom(ClassroomDTO subjectDTO);

    Optional<ClassroomDTO> getClassroomById(Long id);


    Optional<ClassroomDTO> deleteClassroomById(Long id);
}
