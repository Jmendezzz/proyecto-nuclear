package co.edu.cue.proyectonuclear.infrastructure.controllers;

import co.edu.cue.proyectonuclear.exceptions.ClassroomException;
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
    public ResponseEntity<ClassroomDTO> createClassroom(@RequestBody ClassroomDTO classroomDTO){
     Optional<ClassroomDTO> classroomDTOCreated=classroomService.saveClassroom(classroomDTO);
      return new ResponseEntity<>(classroomDTOCreated.get(),HttpStatus.CREATED);
    }


    @GetMapping("/classrooms/{id}")
    public ResponseEntity<ClassroomDTO> getClassroomById(@PathVariable Long id){
        Optional<ClassroomDTO> classroomDTO = classroomService.getClassroomById(id);
        if(classroomDTO.isEmpty()) throw  new ClassroomException("Classroom not found with the ID:"+id, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(classroomDTO.get(), HttpStatus.OK);
    }
    @PutMapping("/classrooms/{id}")
    public ResponseEntity<ClassroomDTO> updateClassroom(@PathVariable Long id, @RequestBody ClassroomDTO classroomDTO) {
        Optional<ClassroomDTO> classroom = classroomService.updateClassroom(id, classroomDTO);
        if (classroom.isEmpty()) throw new ClassroomException("Classroom not found with the ID: " + id,HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(classroom.get(), HttpStatus.OK);

    }
    @DeleteMapping("/classrooms/{id}")
    public ResponseEntity<ClassroomDTO> deleteClassroomById(@PathVariable Long id){
        Optional<ClassroomDTO> classroomDTO = classroomService.deleteClassroom(id);
        classroomService.deleteClassroom(id);
        if (classroomDTO.isEmpty())throw new ClassroomException("Classroom not found with the ID: " + id,HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(classroomDTO.get(), HttpStatus.OK);
    }

}
