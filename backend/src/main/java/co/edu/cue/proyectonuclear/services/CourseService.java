package co.edu.cue.proyectonuclear.services;

import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseStudentRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.GenerateCourseDTO;

import java.util.List;
import java.util.Optional;

public interface CourseService {
    CourseDTO saveCourse(CourseDTO course);
    List<CourseDTO> getAllCourses();
    Optional<CourseDTO> getCourseById(Long id);
    List<CourseDTO> getCoursesByProfessorId(Long professorId);

    List<GenerateCourseDTO> generateCourses();


    List<CourseStudentRequestDTO> getCoursesByStudentId(Long id);
}
