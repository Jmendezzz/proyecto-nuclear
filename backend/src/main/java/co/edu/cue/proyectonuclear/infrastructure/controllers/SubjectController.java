package co.edu.cue.proyectonuclear.infrastructure.controllers;

import co.edu.cue.proyectonuclear.domain.enums.Career;
import co.edu.cue.proyectonuclear.exceptions.SubjectException;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import co.edu.cue.proyectonuclear.services.SubjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
public class SubjectController {
    SubjectService subjectService;

    @GetMapping("/subjects")
    public List<SubjectDTO> getAllSubjects() {
        return subjectService.getAllSubjects();
    }

    @GetMapping("/subjects/{id}")
    public ResponseEntity<SubjectDTO> getSubjectById(@PathVariable Long id) {

        Optional<SubjectDTO> subjectDTO =  subjectService.getSubjectById(id);
        if(subjectDTO.isEmpty()) throw  new SubjectException("Subject not found with the id: "+ id,HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(subjectDTO.get(), HttpStatus.OK);

    }
    @GetMapping("/subjects/career/{career}")
    public List<SubjectDTO> getSubjectsByCareer(@PathVariable Career career){
        return subjectService.getSubjectByCareer(career);
    }

    @GetMapping("/subjects/career/{career}/semester/{semesterNumber}")
    public List<SubjectDTO> getSubjectsByCareerAndSemester(@PathVariable Career career, @PathVariable Integer semesterNumber){
        return  subjectService.getSubjectByCareerAndSemester(career,semesterNumber);

    }

    @PostMapping("/subjects")
    public ResponseEntity<SubjectDTO> createSubject(@RequestBody SubjectDTO subjectDTO) {
        SubjectDTO subjectDTOCreated = subjectService.createSubject(subjectDTO);
        return new ResponseEntity<>(subjectDTOCreated, HttpStatus.CREATED);
    }

    @PutMapping("/subjects")
    public ResponseEntity<SubjectDTO> updateSubject(@RequestBody SubjectDTO subjectDTO){

        SubjectDTO subject= subjectService.updateSubject(subjectDTO);

        return new ResponseEntity<>(subject, HttpStatus.OK);

    }
    @DeleteMapping("/subjects/{id}") //TODO: Eliminar primero de la tabla professor_subjects para poder eliminar una asignatura asociada a un professor.
    public ResponseEntity<SubjectDTO> deleteSubjectById(@PathVariable Long id) {

        SubjectDTO subjectDTO =  subjectService.deleteSubjectById(id);

        return new ResponseEntity<>(subjectDTO, HttpStatus.OK);

    }

}
