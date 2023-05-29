package co.edu.cue.proyectonuclear.infrastructure.controllers;

import co.edu.cue.proyectonuclear.exceptions.ClassroomException;
import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;
import co.edu.cue.proyectonuclear.services.ClassroomService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class ClassroomController {
    ClassroomService classroomService;
    @GetMapping("/classrooms")
    public List<ClassroomDTO> getAllClassroom(){
        return classroomService.getAllClassroom();
    }
    @PostMapping("/classrooms")
    public ClassroomDTO createClassroom(@RequestBody ClassroomDTO classroomDTO){
        return classroomService.saveClassroom(classroomDTO);
    }

    @GetMapping("/classrooms/{id}")
    public ResponseEntity<ClassroomDTO> getClassroomById(@PathVariable Long id){
        ClassroomDTO classroomDTO = classroomService.getClassroomById(id);
        if(classroomDTO==null) throw  new ClassroomException("Classroom not found with the ID:"+id, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(classroomDTO, HttpStatus.OK);
    }
    @PutMapping("/classrooms/{id}")
    public ResponseEntity<ClassroomDTO> updateClassroom(@PathVariable Long id, @RequestBody ClassroomDTO classroomDTO) {
        ClassroomDTO classroom = classroomService.updateClassroom(id, classroomDTO);
        if (classroom == null) throw new ClassroomException("Classroom not found with the ID: " + id,HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(classroom, HttpStatus.OK);

    }
    @DeleteMapping("/classrooms/{id}")
    public ResponseEntity<ClassroomDTO> deleteClassroomById(@PathVariable Long id){
        ClassroomDTO classroomDTO = classroomService.deleteClassroom(id);
        classroomService.deleteClassroom(id);
        return new ResponseEntity<>(classroomDTO, HttpStatus.OK);
    }

}
