package co.edu.cue.proyectonuclear.infrastructure.controllers;

import co.edu.cue.proyectonuclear.domain.entities.Classroom;
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
    public List<Classroom> getAllClassroom(){
        return classroomService.getAllClassroom();
    }
    @GetMapping("/classroom/{id}")
    public Classroom getById(@PathVariable Long id){

        Optional<Classroom> course = classroomService.getAllById(id);
        return course.get();
    }
    @PostMapping("/classroom")
    public Classroom create(@RequestBody Classroom classroom){
        return classroomService.saveClassroom(classroom);
    }

}
