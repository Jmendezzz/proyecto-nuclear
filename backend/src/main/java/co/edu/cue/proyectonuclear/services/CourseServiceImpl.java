package co.edu.cue.proyectonuclear.services;

import co.edu.cue.proyectonuclear.dao.CourseDAO;
import co.edu.cue.proyectonuclear.domain.entities.Course;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class CourseServiceImpl implements CourseService{

    private final CourseDAO courseDAO;


    @Override
    public List<Course> getAllCourses() {
        return courseDAO.getAllCourses();
    }

    @Override
    public Optional<Course> getCourseById(Long id) {
        return Optional.of(courseDAO.findCourseById(id));
    }
}
