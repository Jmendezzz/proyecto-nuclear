package co.edu.cue.proyectonuclear.infrastructure.controllers;

import co.edu.cue.proyectonuclear.domain.enums.Career;
import co.edu.cue.proyectonuclear.exceptions.SubjectNotFoundException;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import co.edu.cue.proyectonuclear.services.SubjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

        SubjectDTO subjectDTO =  subjectService.getSubjectById(id);

        if(subjectDTO == null) throw  new SubjectNotFoundException("Subject not found with the id: "+ id);

        return new ResponseEntity<>(subjectDTO, HttpStatus.OK);

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
    public SubjectDTO createSubject(@RequestBody SubjectDTO subjectDTO) {
        return subjectService.createSubject(subjectDTO);
    }

    @PutMapping("/subjects/{id}")
    public ResponseEntity<SubjectDTO> updateSubject(@PathVariable Long id, @RequestBody SubjectDTO subjectDTO){

        SubjectDTO subject= subjectService.updateSubject(id,subjectDTO);

        if (subject == null) throw new SubjectNotFoundException("Subject not found with the id: "+ id);

        return  new ResponseEntity<>(subject, HttpStatus.OK);

    }

}
