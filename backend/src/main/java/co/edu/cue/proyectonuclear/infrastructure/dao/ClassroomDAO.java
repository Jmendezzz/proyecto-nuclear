package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.domain.entities.Classroom;
import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;

import java.util.List;
import java.util.Optional;

public interface ClassroomDAO {
   ClassroomDTO saveCourse(ClassroomDTO classroomDTO);
    List<ClassroomDTO> getAllClassrrom();


    Optional<ClassroomDTO> findClassroomById(Long id);
    ClassroomDTO updateClassroom(ClassroomDTO subjectDTO);

   Optional<ClassroomDTO> getClassroomById(Long id);


    ClassroomDTO deleteClassroomById(Long id);
}
