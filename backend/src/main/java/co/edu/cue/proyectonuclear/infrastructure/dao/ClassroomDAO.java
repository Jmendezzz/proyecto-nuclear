package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.domain.entities.Classroom;
import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseDTO;

import java.util.List;

public interface ClassroomDAO {
    ClassroomDTO saveCourse(ClassroomDTO classroomDTO);
    List<ClassroomDTO> getAllClassrrom();

    ClassroomDTO findCourseById(Long id);



}
