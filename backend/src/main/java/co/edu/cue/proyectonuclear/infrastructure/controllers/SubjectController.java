package co.edu.cue.proyectonuclear.infrastructure.controllers;

import co.edu.cue.proyectonuclear.domain.enums.Career;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import co.edu.cue.proyectonuclear.services.SubjectService;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
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
    public Optional<SubjectDTO> getSubjectById(@PathVariable @Size(max = 20) Long id) {
        return subjectService.getSubjectById(id);
    }
    @GetMapping("/subjects/{career}")
    public List<SubjectDTO> getSubjectsByCareer(@PathVariable Career career){
        return subjectService.getSubjectByCareer(career);
    }

    @GetMapping("/subjects/{career}/{semesterNumber}")
    public List<SubjectDTO> getSubjectsByCareerAndSemester(@PathVariable Career career, @PathVariable Integer semesterNumber){
        return  subjectService.getSubjectByCareerAndSemester(career,semesterNumber);

    }

    @PostMapping("/subjects")
    public SubjectDTO createSubject(@RequestBody SubjectDTO subjectDTO) {
        return subjectService.createSubject(subjectDTO);
    }
}
