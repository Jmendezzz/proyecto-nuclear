package co.edu.cue.proyectonuclear.infrastructure.controllers;


import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.services.CourseService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
public class CourseController {
    CourseService courseService;
    @GetMapping("/courses")
    public List<Course> getAllCourses(){
        return courseService.getAllCourses();
    }
    @GetMapping("/courses/{id}")
    public Course getById(@PathVariable Long id){

    Optional<Course> course = courseService.getCourseById(id);
    //TODO: Do a validation if the course isPresent.
    return course.get();
    }

}
