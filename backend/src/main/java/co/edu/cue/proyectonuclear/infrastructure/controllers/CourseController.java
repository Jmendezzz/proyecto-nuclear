package co.edu.cue.proyectonuclear.infrastructure.controllers;


import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.exceptions.CourseNotFoundException;
import co.edu.cue.proyectonuclear.services.CourseService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/courses")
    public Course createCourse(@RequestBody Course course){
        return courseService.saveCourse(course);
    }
    @GetMapping("/courses/{id}")
    public Course getById(@PathVariable Long id){

        Optional<Course> course = courseService.getCourseById(id);

        if(course.isEmpty()) throw  new CourseNotFoundException("Course not found with the ID:"+id);

        return course.get();
    }
    @GetMapping("/courses/professor/{id}")
    public List<Course> getCoursesByProfessorId(@PathVariable Long id){
        return  courseService.getCoursesByProfessorId(id);
    }


}
