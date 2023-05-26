package co.edu.cue.proyectonuclear.infrastructure.controllers;

import co.edu.cue.proyectonuclear.exceptions.CourseNotFoundException;
import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;
import co.edu.cue.proyectonuclear.services.ClassroomService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
public class ClassroomController {
    ClassroomService classroomService;

    @GetMapping("/classroom")
    public List<ClassroomDTO> getAllCourses(){
        return classroomService.getAllClassroom();

    }
    @PostMapping("/classroom")
    public ClassroomDTO createCourse(@RequestBody ClassroomDTO classroomDTO){
        return classroomService.saveClassroom(classroomDTO);
    }
    @GetMapping("/classroom/{id}")
    public ClassroomDTO getById(@PathVariable Long id){

        Optional<ClassroomDTO> classroom = classroomService.getClassroomById(id);

        if(classroom.isEmpty()) throw  new CourseNotFoundException("Classroom not found with the ID:"+id);

        return classroom.get();
    }


}
