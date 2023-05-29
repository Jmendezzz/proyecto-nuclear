package co.edu.cue.proyectonuclear.infrastructure.controllers;

import co.edu.cue.proyectonuclear.domain.entities.Classroom;
import co.edu.cue.proyectonuclear.exceptions.ClassroomNotFoundException;
import co.edu.cue.proyectonuclear.exceptions.CourseNotFoundException;
import co.edu.cue.proyectonuclear.exceptions.SubjectNotFoundException;
import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import co.edu.cue.proyectonuclear.services.ClassroomService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
public class ClassroomController {
    ClassroomService classroomService;
    @GetMapping("/classrooms")
    public List<ClassroomDTO> getAllClassroom(){
        return classroomService.getAllClassroom();
    }
    @PostMapping("/classrooms")
    public Optional<ClassroomDTO> createClassroom(@RequestBody ClassroomDTO classroomDTO){
        return classroomService.saveClassroom(classroomDTO);
    }

    @GetMapping("/classrooms/{id}")
    public Optional<ClassroomDTO> getClassroomById(@PathVariable Long id){
        Optional<ClassroomDTO> classroomDTO = classroomService.getClassroomById(id);
        if(classroomDTO==null) throw  new ClassroomNotFoundException("Classroom not found with the ID:"+id);
        //return new ResponseEntity<>(classroomDTO, HttpStatus.OK);
        return classroomDTO;
    }
    @PutMapping("/classrooms/{id}")
    public Optional<ClassroomDTO> updateClassroom(@PathVariable Long id, @RequestBody ClassroomDTO classroomDTO){
        Optional<ClassroomDTO> classroom= classroomService.updateClassroom(id,classroomDTO);
        if (classroom == null) throw new ClassroomNotFoundException("Classroom not found with the id: "+ id);
        //return  new ResponseEntity<>(classroom, HttpStatus.OK);
        return classroom;

    }
    @DeleteMapping("/classrooms/{id}")
    public Optional<ClassroomDTO> deleteClassroomById(@PathVariable Long id){
        Optional<ClassroomDTO> classroomDTO = classroomService.deleteClassroom(id);
        if(classroomDTO==null) throw  new ClassroomNotFoundException("Classroom not found with the ID:"+id);
        classroomService.deleteClassroom(id);
        //return new ResponseEntity<>(classroomDTO, HttpStatus.OK);
        return classroomDTO;
    }

}
