package co.edu.cue.proyectonuclear.services;

import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.mapping.dtos.*;

import java.util.List;
import java.util.Optional;

public interface CourseService {
    CourseDTO saveCourse(GenerateCourseDTO course);
    List<CourseDTO> getAllCourses();
    Optional<CourseDTO> getCourseById(Long id);
    List<CourseUserRequestDTO> getCoursesByProfessorId(Long professorId);
    List<GenerateCourseDTO> generateCourses(List<SubjectDTO> subjects);
    List<CourseUserRequestDTO> getCoursesByStudentId(Long id);

}
