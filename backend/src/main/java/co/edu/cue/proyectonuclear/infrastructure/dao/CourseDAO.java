package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.domain.entities.Course;

import java.util.List;
import java.util.Optional;

public interface CourseDAO {

    Course saveCourse(Course course);
    List<Course> getAllCourses();
    Course createCourse(Course course);
    Course findCourseById(Long id);
    List<Course> getCoursesByProfessorId(Long professorId);

}
