package co.edu.cue.proyectonuclear.infrastructure.controllers;


import co.edu.cue.proyectonuclear.exceptions.CourseException;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseStudentRequestDTO;
import co.edu.cue.proyectonuclear.services.CourseService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
public class CourseController {
    CourseService courseService;
    @GetMapping("/courses")
    public List<CourseDTO> getAllCourses(){
        return courseService.getAllCourses();
    }
    @PostMapping("/courses")
    public CourseDTO createCourse(@RequestBody CourseDTO course){
        return courseService.saveCourse(course);
    }
    @GetMapping("/courses/{id}")
    public CourseDTO getById(@PathVariable Long id){

        Optional<CourseDTO> course = courseService.getCourseById(id);

        if(course.isEmpty()) throw  new CourseException("Course not found with the ID:"+id, HttpStatus.NOT_FOUND);

        return course.get();
    }
    @GetMapping("/courses/professor/{id}")
    public List<CourseDTO> getCoursesByProfessorId(@PathVariable Long id){
        return  courseService.getCoursesByProfessorId(id);
    }

    @GetMapping("/courses/student/{id}")
    public List<CourseStudentRequestDTO> getCoursesByStudentId(@PathVariable Long id){
        return courseService.getCoursesByStudentId(id);

    }


}
