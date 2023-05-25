package co.edu.cue.proyectonuclear.services;

import co.edu.cue.proyectonuclear.domain.entities.Course;

import java.util.List;
import java.util.Optional;

public interface CourseService {
    Course saveCourse(Course course);
    List<Course> getAllCourses();
    Optional<Course> getCourseById(Long id);
    List<Course> getCoursesByProfessorId(Long professorId);

    void createCourses();


}
