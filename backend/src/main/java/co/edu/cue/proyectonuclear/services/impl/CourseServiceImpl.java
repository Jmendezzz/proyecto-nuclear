package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.infrastructure.dao.CourseDAO;
import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.services.CourseService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseDAO courseDAO;
    @Override
    public Course saveCourse(Course course) {
        return courseDAO.saveCourse(course);
    }

    @Override
    public List<Course> getAllCourses() {
        return courseDAO.getAllCourses();
    }

    @Override
    public Optional<Course> getCourseById(Long id) {
        return Optional.of(courseDAO.findCourseById(id));
    }

    @Override
    public List<Course> getCoursesByProfessorId(Long professorId) {
        return  courseDAO.getCoursesByProfessorId(professorId);
    }

    @Override
    public void createCourses() {
        //TODO
    }

}