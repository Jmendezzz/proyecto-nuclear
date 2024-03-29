package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.mapping.dtos.CourseDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseUserRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.GenerateCourseDTO;

import java.util.List;
import java.util.Optional;

public interface CourseDAO {

    CourseDTO saveCourse(GenerateCourseDTO course);
    List<CourseDTO> getAllCourses();
    CourseDTO findCourseById(Long id);
    List<CourseUserRequestDTO> getCoursesByProfessorId(Long professorId);
    List<CourseUserRequestDTO> getCoursesByStudentId(Long id);
    List<CourseDTO> getCoursesByClassroomId(Long classroomId);

}
