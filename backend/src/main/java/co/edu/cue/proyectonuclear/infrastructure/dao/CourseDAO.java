package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.domain.entities.Course;

import java.util.List;
import java.util.Optional;

public interface CourseDAO {
    List<Course> getAllCourses();
    Course createCourse(Course course);
    Course findCourseById(Long id);

}
